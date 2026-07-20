# 📖 TÀI LIỆU HỌC TẬP TUẦN 2: KIẾN TRÚC PLAYWRIGHT & CHIẾN LƯỢC ĐỊNH VỊ PHẦN TỬ (LOCATORS)

Tài liệu này chi tiết hóa toàn bộ lý thuyết nền tảng của Playwright, cấu trúc của một file kịch bản kiểm thử, và các phương pháp định vị phần tử (Locators) tối ưu nhất giúp kịch bản kiểm thử bền vững.

---

## 1. KIẾN TRÚC PHÂN TẦNG VÀ CƠ CHẾ WORKERS CỦA PLAYWRIGHT

Playwright được thiết kế tối ưu cho kỷ nguyên chạy song song quy mô lớn với cấu trúc phân tầng như sau:

```text
  [ Browser ] (Chromium, Firefox, WebKit...) -> Chỉ khởi chạy 1 lần duy nhất cho mỗi Worker.
       │
       ├── [ Browser Context 1 ] (Giống như Tab ẩn danh 1 - Lưu trữ Cookies & Session riêng)
       │         └── [ Page ] (Tab trình duyệt cụ thể thực hiện hành động)
       │
       └── [ Browser Context 2 ] (Giống như Tab ẩn danh 2 - Lưu trữ Cookies & Session riêng)
                 ├── [ Page 1 ] (Tab 1)
                 └── [ Page 2 ] (Tab 2)
```

### Chi tiết các thành phần:
*   **Browser (Trình duyệt):** Playwright khởi chạy trình duyệt thật (như Chrome). Việc mở trình duyệt tốn nhiều tài nguyên, nên Playwright tối ưu bằng cách chỉ khởi chạy 1 Browser duy nhất cho suốt quá trình chạy của một nhóm kiểm thử trong cùng một **Worker**.
*   **Worker Process (Tiến trình thợ):** Là các tiến trình chạy độc lập trên hệ điều hành, tận dụng tối đa số lượng nhân CPU của máy tính. Mỗi Worker sẽ đảm nhận chạy một file kịch bản kiểm thử tại một thời điểm.
*   **Browser Context (Ngữ cảnh trình duyệt):** 
    *   Mỗi test case chạy sẽ khởi tạo một Browser Context riêng.
    *   Hoạt động giống như **Tab ẩn danh (Incognito Mode)** hoàn toàn cô lập. 
    *   Nó giúp tách biệt 100% dữ liệu đăng nhập, token, cache giữa các test case, giúp việc chạy song song (Parallel) không bao giờ bị trùng lặp dữ liệu.
*   **Page (Trang):** Là một Tab cụ thể trong Browser Context để tương tác thực tế với trang web thông qua các lệnh như click, nhập text, kiểm tra nội dung.

---

## 2. CƠ CHẾ TỰ ĐỘNG CHỜ (AUTO-WAITING)

Nguyên nhân lớn nhất gây lỗi chập chờn (Flaky test) trong Automation Test là do độ trễ mạng làm cho code chạy nhanh hơn tốc độ tải trang. Playwright giải quyết triệt để việc này bằng cơ chế **Auto-waiting**.

Trước khi thực hiện bất kỳ hành động nào (ví dụ: `.click()`, `.fill()`, `.check()`), Playwright sẽ tự động thực hiện các bước kiểm tra (Actionability checks) trên phần tử:
1.  **Attached:** Đã xuất hiện trong cấu trúc DOM của trang web.
2.  **Visible:** Đã hiển thị thực tế trên màn hình (không có thuộc tính ẩn như `display: none` hay `opacity: 0`).
3.  **Stable:** Phần tử đã đứng yên, không còn chuyển động hoặc chạy hiệu ứng animation.
4.  **Enabled:** Phần tử không bị khóa (không có thuộc tính `disabled`).
5.  **Receivable Events:** Phần tử không bị che khuất bởi các phần tử khác, sẵn sàng nhận tương tác chuột.

> 💡 **Quy tắc:** Bạn hầu như **không bao giờ** cần phải tự viết hàm `sleep` cứng trong kịch bản test Playwright thực tế, vì công cụ sẽ tự động đợi thông minh cho bạn.

---

## 3. CHIẾN LƯỢC ĐỊNH VỊ PHẦN TỬ (LOCATORS)

Locator là cách bạn chỉ cho Playwright biết cần tương tác với phần tử nào trên trang web. Playwright ưu tiên sử dụng các bộ định vị hướng tới trải nghiệm người dùng (Resilient Locators) để tránh kịch bản bị sập khi cấu trúc HTML thay đổi.

### a. `page.getByRole(role, options)` (Khuyên dùng nhất)
Tìm phần tử theo vai trò ngữ nghĩa của nó trong HTML (như nút, ô nhập, checkbox, link...) kết hợp với tên hiển thị.
*   **Cú pháp:**
    ```typescript
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
    await page.getByRole('checkbox', { name: 'Ghi nhớ đăng nhập' }).check();
    ```

### b. `page.getByText(text)`
Tìm phần tử dựa trên đoạn chữ hiển thị thực tế trên màn hình (thường dùng để xác nhận thông báo hiển thị).
*   **Cú pháp:**
    ```typescript
    await expect(page.getByText('Đăng nhập thành công!')).toBeVisible();
    ```

### c. `page.getByPlaceholder(placeholder)`
Tìm kiếm ô nhập dữ liệu thông qua văn bản gợi ý mờ nằm trong ô đó.
*   **Cú pháp:**
    ```typescript
    await page.getByPlaceholder('Nhập mật khẩu của bạn...').fill('123456');
    ```

### d. `page.getByTestId(testId)`
Được dùng nhiều nhất trong môi trường dự án chuyên nghiệp. Developer sẽ gán một thuộc tính riêng `data-testid` cho các nút hoặc ô quan trọng để phục vụ riêng cho việc test.
*   **Cú pháp:**
    ```typescript
    // HTML: <button data-testid="login-submit">Submit</button>
    await page.getByTestId('login-submit').click();
    ```

### e. CSS Selector (Khi không có locator thông minh)
Nếu trang web không thiết kế chuẩn SEO hoặc không có thuộc tính thân thiện, ta dùng CSS Selector.
*   **Theo ID (dùng dấu `#`):** `page.locator('#username-input')`
*   **Theo Class (dùng dấu `.`):** `page.locator('.btn-primary')`
*   **Theo thuộc tính bất kỳ:** `page.locator('[name="login"]')`

---

## 4. CÁC HÀNH ĐỘNG TƯƠNG TÁC TRÊN TRÌNH DUYỆT (BROWSER ACTIONS)

Để mô phỏng lại hành vi của người dùng thực tế, Playwright cung cấp một bộ các phương thức tương tác UI rất phong phú. Dưới đây là các hành động phổ biến kèm cú pháp và ví dụ cụ thể:

### a. Nhấp chuột (Click)
Dùng để click chuột trái vào các nút, liên kết, hoặc bất kỳ phần tử nào.
*   **Cú pháp:** `await locator.click();`
*   **Ví dụ:**
    ```typescript
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    ```
*   **Click chuột phải (Right click):**
    ```typescript
    await page.locator('#my-element').click({ button: 'right' });
    ```
*   **Click đúp (Double click):**
    ```typescript
    await page.locator('#my-element').dblclick();
    ```

### b. Nhập dữ liệu văn bản (Fill)
Dùng để điền thông tin nhanh vào các ô nhập liệu (Textbox, Input, Textarea). Hàm này tự động xóa sạch text cũ trước khi điền text mới.
*   **Cú pháp:** `await locator.fill('nội_dung_chữ');`
*   **Ví dụ:**
    ```typescript
    await page.getByPlaceholder('Nhập mật khẩu').fill('SuperPassword123');
    ```

### c. Gõ phím từng ký tự (Press / Sequential Typing)
Mô phỏng chân thực hành vi gõ bàn phím (khiến trang web kích hoạt các bộ lọc tìm kiếm gợi ý hoặc bắt các sự kiện gõ phím).
*   **Gõ tuần tự từng chữ:** `.pressSequentially()`
    ```typescript
    // Mô phỏng người dùng gõ từng chữ một cách tự nhiên vào ô tìm kiếm
    await page.getByPlaceholder('Tìm kiếm sản phẩm').pressSequentially('iPhone 15');
    ```
*   **Nhấn một phím bất kỳ trên bàn phím (như Enter, Backspace, Tab):** `.press()`
    ```typescript
    // Nhấn phím Enter sau khi gõ xong
    await page.getByPlaceholder('Tìm kiếm sản phẩm').press('Enter');
    ```

### d. Chọn Checkbox và Radio Button (Check / Uncheck)
Dùng để tích chọn hoặc bỏ tích chọn các ô Checkbox hoặc chọn nút Radio.
*   **Cú pháp:** `await locator.check();` hoặc `await locator.uncheck();`
*   **Ví dụ:**
    ```typescript
    // Tích chọn checkbox đồng ý điều khoản
    await page.getByRole('checkbox', { name: 'Đồng ý điều khoản' }).check();

    // Bỏ tích chọn
    await page.getByRole('checkbox', { name: 'Nhận thông báo qua Email' }).uncheck();
    ```

### e. Chọn phần tử trong danh sách thả xuống (Select Option)
Dùng để tương tác với thẻ `<select>` chứa các thẻ `<option>`.
*   **Cú pháp:** `await locator.selectOption('giá_tri_hoặc_nhãn');`
*   **Ví dụ:**
    ```typescript
    // HTML: <select id="country"><option value="VN">Việt Nam</option></select>
    
    // Cách 1: Chọn bằng Value
    await page.locator('select#country').selectOption('VN');

    // Cách 2: Chọn bằng Label hiển thị
    await page.locator('select#country').selectOption({ label: 'Việt Nam' });
    ```

### f. Rê chuột (Hover)
Dùng để di chuyển con trỏ chuột đến một phần tử mà không nhấp vào (thường dùng để hiển thị menu thả xuống nhiều cấp).
*   **Cú pháp:** `await locator.hover();`
*   **Ví dụ:**
    ```typescript
    // Rê chuột vào danh mục sản phẩm để mở menu con
    await page.getByText('Danh mục sản phẩm').hover();
    ```

---

## 5. CẤU TRÚC CHI TIẾT CỦA MỘT FILE TEST TRONG PLAYWRIGHT

Dưới đây là cấu trúc cơ bản và giải thích của một file viết kịch bản test bằng Playwright:

```typescript
import { test, expect } from '@playwright/test';

// Khai báo một nhóm các test case có liên quan bằng describe
test.describe('Nhóm kiểm thử chức năng Đăng Nhập', () => {

    // test case cụ thể (bắt buộc sử dụng async/await)
    test('Kịch bản: Đăng nhập thành công với tài khoản chuẩn', async ({ page }) => {
        // 1. Đi tới trang web mục tiêu
        await page.goto('https://practice.expandesting.com/login');

        // 2. Nhập tài khoản và mật khẩu (sử dụng Locator)
        await page.getByLabel('Username').fill('practice');
        await page.getByLabel('Password').fill('SuperSecretPassword');

        // 3. Click nút Submit để thực hiện đăng nhập
        await page.getByRole('button', { name: 'Login' }).click();

        // 4. Xác nhận kết quả (Assertion)
        // Kiểm tra xem URL trang hiện tại có chứa từ khóa "/secure" không
        await expect(page).toHaveURL(/.*secure/);
        
        // Kiểm tra xem thông báo chào mừng có hiển thị trên màn hình không
        await expect(page.getByText('Welcome to the Secure Area')).toBeVisible();
    });

});
```

### Giải thích các thành phần cấu trúc:
1.  **`import { test, expect }`**: 
    *   `test`: Dùng để khai báo và chạy các kịch bản kiểm thử.
    *   `expect`: Dùng để khẳng định kết quả (Assertions) - kiểm tra xem thực tế có đúng như mong đợi không.
2.  **`async ({ page })`**:
    *   Mỗi test case nhận vào một tham số `{ page }` đại diện cho Tab trình duyệt hiện tại (Playwright tự động khởi tạo Page này cho bạn).
    *   Mọi tương tác với trình duyệt đều bất đồng bộ nên bắt buộc phải có `async` ở đầu test và `await` trước mỗi hành động.
3.  **`expect(page).toHaveURL()`**:
    *   Khẳng định mạnh mẽ (Auto-retrying assertions) của Playwright. Nó sẽ tự động chờ và thử lại liên tục cho đến khi URL khớp với mong đợi mới thôi, giúp tránh lỗi mạng chậm.

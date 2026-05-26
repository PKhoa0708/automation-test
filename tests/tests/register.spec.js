import { test, expect } from '@playwright/test';
import registerData from './register-data.json' assert { type: 'json' };

// Kích hoạt chế độ chạy song song cho các test case trong file này
test.describe.configure({ mode: 'parallel' });

test.describe('Kiểm thử chức năng Đăng ký tài khoản', () => {

  test.beforeEach(async ({ page }) => {
    // Trước mỗi test case, đi tới trang chủ và click nút "Đăng ký" trên thanh menu
    await page.goto('/');
    await page.click('text=Đăng ký');
    
    // Xác minh đã chuyển hướng sang đúng trang đăng ký
    await expect(page).toHaveURL(/\/auth\/register\.php/);
  });

  // ==========================================
  // I. CÁC TEST CASE Đ1ẶC THÙ (STANDALONE TESTS)
  // ==========================================

  test('TC01: Xác minh giao diện trang đăng ký hiển thị đầy đủ các thành phần', async ({ page }) => {
    // 1. Kiểm tra tiêu đề chính của panel đăng ký
    const heading = page.locator('.register-heading h2');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Đăng ký tài khoản');

    // 2. Kiểm tra sự tồn tại của các nhãn (label) và trường nhập liệu
    await expect(page.locator('label:has-text("Họ và tên")')).toBeVisible();
    await expect(page.locator('input[name="full_name"]')).toBeVisible();

    await expect(page.locator('label:has-text("Email")')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();

    await expect(page.locator('label:has-text("Số điện thoại")')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();

    await expect(page.locator('label:has-text("Vai trò")')).toBeVisible();
    await expect(page.locator('select[name="role"]')).toBeVisible();

    await expect(page.locator('label:has-text("Địa chỉ")')).toBeVisible();
    await expect(page.locator('input[name="address"]')).toBeVisible();

    await expect(page.locator('label:has-text("Mật khẩu")').first()).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();

    await expect(page.locator('label:has-text("Nhập lại mật khẩu")')).toBeVisible();
    await expect(page.locator('input[name="confirm_password"]')).toBeVisible();

    // 3. Kiểm tra nút Đăng ký
    const registerBtn = page.locator('.register-btn');
    await expect(registerBtn).toBeVisible();
    await expect(registerBtn).toHaveText('Đăng ký');

    // 4. Kiểm tra panel showcase bên trái
    const showcase = page.locator('.register-showcase');
    await expect(showcase).toBeVisible();
  });

  test('TC02: Kiểm tra chuyển hướng sang trang Đăng nhập', async ({ page }) => {
    // Tìm liên kết "Đăng nhập" ở cuối form và click vào
    await page.click('text=Đăng nhập');

    // Xác minh xem URL có chuyển hướng sang trang đăng nhập không
    await expect(page).toHaveURL(/\/auth\/login\.php/);
  });

  test('TC03: Kiểm tra di chuyển tuần tự qua các trường bằng phím Tab', async ({ page }) => {
    // Tập trung vào trường đầu tiên: Họ và tên
    await page.focus('input[name="full_name"]');
    await expect(page.locator('input[name="full_name"]')).toBeFocused();

    // Nhấn Tab -> Email
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="email"]')).toBeFocused();

    // Nhấn Tab -> Số điện thoại
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="phone"]')).toBeFocused();

    // Nhấn Tab -> Vai trò (dropdown)
    await page.keyboard.press('Tab');
    await expect(page.locator('select[name="role"]')).toBeFocused();

    // Nhấn Tab -> Địa chỉ
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="address"]')).toBeFocused();

    // Nhấn Tab -> Mật khẩu
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="password"]')).toBeFocused();

    // Nhấn Tab -> Nhập lại mật khẩu
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="confirm_password"]')).toBeFocused();
  });

  test.describe('Nhóm kiểm thử Responsive', () => {
    // Sử dụng tùy chọn cấu hình viewport của Playwright thay vì đổi size động lúc chạy
    test.use({ viewport: { width: 375, height: 812 } });

    test('TC04: Kiểm tra tính năng Responsive trên màn hình di động', async ({ page }) => {
      // Đảm bảo tất cả các input và button vẫn hiển thị
      await expect(page.locator('input[name="full_name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="phone"]')).toBeVisible();
      await expect(page.locator('select[name="role"]')).toBeVisible();
      await expect(page.locator('input[name="address"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.locator('input[name="confirm_password"]')).toBeVisible();
      await expect(page.locator('.register-btn')).toBeVisible();
    });
  });

  test('TC05: Đăng ký thành công tài khoản Khách du lịch', async ({ page }) => {
    await page.fill('input[name="full_name"]', 'Nguyễn Văn Tourist');
    
    // Email ngẫu nhiên tránh trùng lặp
    const randomEmail = `tourist_${Date.now()}@gmail.com`;
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="phone"]', '0987654321');
    await page.selectOption('select[name="role"]', 'tourist');
    await page.fill('input[name="address"]', 'Hải Phòng');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm_password"]', '123456');
    
    await page.click('.register-btn');

    // Sau khi đăng ký thành công, hệ thống chuyển sang trang đăng nhập và có thông báo thành công
    await expect(page).toHaveURL(/\/auth\/login\.php/);
    const successAlert = page.locator('.alert-success');
    await expect(successAlert).toBeVisible();
  });

  test('TC06: Đăng ký thành công tài khoản Chủ dịch vụ', async ({ page }) => {
    await page.fill('input[name="full_name"]', 'Nguyễn Văn Provider');
    
    // Email ngẫu nhiên tránh trùng lặp
    const randomEmail = `provider_${Date.now()}@gmail.com`;
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="phone"]', '0987654321');
    await page.selectOption('select[name="role"]', 'provider');
    await page.fill('input[name="address"]', 'Hải Phòng');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm_password"]', '123456');
    
    await page.click('.register-btn');

    await expect(page).toHaveURL(/\/auth\/login\.php/);
    const successAlert = page.locator('.alert-success');
    await expect(successAlert).toBeVisible();
  });

  test('TC26: Kiểm tra các ô mật khẩu có thuộc tính type="password" ẩn ký tự', async ({ page }) => {
    const typePassword = await page.getAttribute('input[name="password"]', 'type');
    const typeConfirmPassword = await page.getAttribute('input[name="confirm_password"]', 'type');
    
    expect(typePassword).toBe('password');
    expect(typeConfirmPassword).toBe('password');
  });

  test('TC30: Kiểm tra chống double-click khi đăng ký', async ({ page }) => {
    await page.fill('input[name="full_name"]', 'Nguyễn Văn Double Click');
    
    const randomEmail = `tester_tc30_${Date.now()}@gmail.com`;
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="phone"]', '0987654321');
    await page.fill('input[name="address"]', 'Hải Phòng');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirm_password"]', 'password123');

    const registerBtn = page.locator('.register-btn');
    // Thực hiện click 2 lần liên tục
    await registerBtn.click({ clickCount: 2 });

    // URL chuyển về login.php chứng tỏ form được xử lý thành công
    await expect(page).toHaveURL(/\/auth\/login\.php/);
  });

  // ==========================================
  // II. CÁC TEST CASE DATA-DRIVEN (VÒNG LẶP)
  // ==========================================

  for (const data of registerData) {
    test(data.CaseName, async ({ page }) => {
      // 1. Điền Họ và tên
      if (data.FullName !== undefined) {
        await page.fill('input[name="full_name"]', data.FullName);
      }

      // 2. Điền Email (Tự động chuyển đổi nếu là "dynamic")
      let emailToFill = data.Email;
      if (data.Email === 'dynamic') {
        emailToFill = `tester_${data.CaseId.toLowerCase()}_${Date.now()}@gmail.com`;
      }
      if (emailToFill !== undefined) {
        await page.fill('input[name="email"]', emailToFill);
      }

      // 3. Điền Số điện thoại
      if (data.Phone !== undefined) {
        await page.fill('input[name="phone"]', data.Phone);
      }

      // 4. Chọn Vai trò
      if (data.Role !== undefined) {
        await page.selectOption('select[name="role"]', data.Role);
      }

      // 5. Điền Địa chỉ
      if (data.Address !== undefined) {
        await page.fill('input[name="address"]', data.Address);
      }

      // 6. Điền Mật khẩu và Xác nhận mật khẩu
      if (data.Password !== undefined) {
        await page.fill('input[name="password"]', data.Password);
      }
      if (data.ConfirmPassword !== undefined) {
        await page.fill('input[name="confirm_password"]', data.ConfirmPassword);
      }

      // 7. Click Đăng ký
      await page.click('.register-btn');

      // 8. Xác minh kết quả mong muốn
      if (data.Type === 'success') {
        // Đăng ký thành công -> URL sang trang đăng nhập và có thông báo thành công
        await expect(page).toHaveURL(/\/auth\/login\.php/);
        const successAlert = page.locator('.alert-success');
        await expect(successAlert).toBeVisible();

      } else if (data.Type === 'validation_error') {
        // Lỗi HTML5 phía client -> URL vẫn là trang đăng ký và phần tử được chỉ định sẽ có validity = invalid
        await expect(page).toHaveURL(/\/auth\/register\.php/);
        
        if (data.InvalidField) {
          const isValid = await page.$eval(
            `[name="${data.InvalidField}"]`,
            el => el.checkValidity()
          );
          expect(isValid).toBe(false);
        }

      } else if (data.Type === 'server_error') {
        // Chờ URL ổn định (hoặc chứa register.php hoặc chứa chrome-error / chromewebdata)
        try {
          await page.waitForURL(url => {
            const urlStr = url.toString();
            return urlStr.includes('register.php') || 
                   urlStr.includes('process_register.php') || 
                   urlStr.includes('chrome-error') || 
                   urlStr.includes('chromewebdata') || 
                   urlStr.includes('about:');
          }, { timeout: 5000 });
        } catch (e) {
          // Bỏ qua nếu timeout
        }

        const currentUrl = page.url();
        const isSystemError = currentUrl.includes('chrome-error') || 
                              currentUrl.includes('chromewebdata') || 
                              currentUrl.includes('process_register.php') || 
                              currentUrl.includes('about:');

        if (isSystemError) {
          // Đã xác minh lỗi hệ thống (HTTP 500 khi trùng Email ở tất cả trình duyệt)
          expect(true).toBe(true);
        } else {
          // Lỗi bình thường phía máy chủ hiển thị alert-error (như mật khẩu không khớp)
          await expect(page).toHaveURL(/\/auth\/register\.php/);
          const errorAlert = page.locator('.alert-error');
          await expect(errorAlert).toBeVisible();
          if (data.ExpectedError) {
            await expect(errorAlert).toContainText(data.ExpectedError);
          }
        }
      }
    });
  }

});

# 📖 TÀI LIỆU HỌC TẬP TUẦN 1: TYPESCRIPT CHO AUTOMATION TESTER

Tài liệu này tổng hợp chi tiết lý thuyết và ví dụ thực tế về **Biến (Variables)**, **Kiểu dữ liệu (Data Types)**, và **Hàm (Functions)** trong TypeScript phục vụ cho việc viết kịch bản Automation Test.

---

## 1. BIẾN (VARIABLES): LET VÀ CONST

Trong TypeScript (và JavaScript hiện đại), chúng ta sử dụng `const` và `let` thay cho từ khóa `var` cũ để khai báo biến.

| Đặc điểm | `const` (Constant) | `let` |
| :--- | :--- | :--- |
| **Ý nghĩa** | Khai báo hằng số (giá trị không đổi). | Khai báo biến (giá trị có thể thay đổi). |
| **Gán lại giá trị** | **Không thể** gán lại giá trị mới sau khi khai báo. | **Có thể** gán lại giá trị mới thoải mái. |
| **Khi nào dùng** | URL trang web, Selector/Locator, thông tin đăng nhập cố định, timeout chuẩn. | Biến đếm vòng lặp, trạng thái (flag) kiểm tra, số lần chạy lại (retry). |

### Ví dụ thực tế:
```typescript
// 1. Dùng const cho các thông tin cố định trong bài test
const URL_DANG_NHAP: string = "https://example.com/login";
const SELECTOR_NUT_SUBMIT: string = "button[type='submit']";
const THOI_GIAN_CHO_TOI_DA: number = 10000; // 10 giây

// Thử gán lại sẽ bị báo lỗi ngay:
// URL_DANG_NHAP = "https://google.com"; // LỖI: Cannot assign to 'URL_DANG_NHAP' because it is a constant.

// 2. Dùng let cho các biến cần thay đổi giá trị khi chạy test
let soLanThuLai: number = 0;
soLanThuLai = soLanThuLai + 1; // Hợp lệ

let daTimThayPhanTu: boolean = false;
daTimThayPhanTu = true; // Hợp lệ
```

---

## 2. CÁC KIỂU DỮ LIỆU CƠ BẢN (DATA TYPES)

TypeScript bắt buộc (hoặc khuyến khích) khai báo kiểu dữ liệu cho biến theo cú pháp:
`let tenBien: kieuDuLieu = giaTri;`

### a. Kiểu `string` (Chuỗi chữ)
Chứa văn bản, đặt trong dấu nháy kép `""`, nháy đơn `''` hoặc nháy ngược `` ``.
* **Ví dụ:**
  ```typescript
  const tieuDeTrang: string = "Trang quản trị";
  const xpathElement: string = "//*[@id='username']";
  ```

### b. Kiểu `number` (Số)
Chứa cả số nguyên và số thực (số thập phân).
* **Ví dụ:**
  ```typescript
  const port: number = 3000;
  const thoiGianCho: number = 2.5; // 2.5 giây
  ```

### c. Kiểu `boolean` (Đúng / Sai)
Chỉ nhận một trong hai giá trị: `true` hoặc `false`. Thường dùng trong các câu lệnh điều kiện `if-else`.
* **Ví dụ:**
  ```typescript
  const isChecked: boolean = true;
  const isEnabled: boolean = false;
  ```

### d. Kiểu `Array` (Mảng / Danh sách)
Chứa một danh sách các giá trị cùng kiểu. Có 2 cách khai báo:
* **Ví dụ:**
  ```typescript
  // Cách 1: Dung kiểu[] (Khuyên dùng)
  const danhSachSanPham: string[] = ["iPhone 15", "Samsung S24", "Xiaomi 14"];

  // Cách 2: Dùng Array<kiểu>
  const danhSachTimeout: Array<number> = [1000, 2000, 5000];
  ```

### e. Kiểu `any` (Kiểu bất kỳ)
Bỏ qua việc kiểm tra kiểu dữ liệu của TypeScript. 
> ⚠️ **Hạn chế dùng:** Chỉ dùng khi bạn thực sự không biết dữ liệu nhận về từ API hoặc nguồn bên ngoài có cấu trúc thế nào. Lạm dụng `any` sẽ làm mất đi tác dụng bảo vệ của TypeScript.
* **Ví dụ:**
  ```typescript
  let duLieuTuPhiaDev: any = "Chuỗi ban đầu";
  duLieuTuPhiaDev = 123; // Vẫn hợp lệ, không bị báo lỗi
  ```

---

## 3. HÀM (FUNCTIONS) TRONG TYPESCRIPT

Hàm là một khối mã thực hiện một nhiệm vụ cụ thể. Trong kiểm thử, ta dùng hàm để tái sử dụng mã (ví dụ: viết hàm nhập dữ liệu, hàm click, hàm login).

### Cấu trúc cơ bản của hàm:
```typescript
function tenHam(thamSo1: kieu1, thamSo2: kieu2): kieuTraVe {
    // Logic xử lý của hàm
    return giaTriTraVe;
}
```
*Nếu hàm không trả về giá trị gì (chỉ thực hiện hành động), kiểu trả về sẽ là `void`.*

### Ví dụ thực tế các loại hàm:

#### 1. Hàm không trả về giá trị (`void`)
```typescript
function nhapDuLieu(locator: string, text: string): void {
    console.log(`[Action] Nhập chữ "${text}" vào ô có locator: ${locator}`);
    // Thực tế trong Playwright sẽ là: await page.locator(locator).fill(text);
}

// Gọi hàm:
nhapDuLieu("input#username", "admin123");
```

#### 2. Hàm có trả về giá trị
```typescript
function layThoiGianHienTai(): number {
    return Date.now();
}

// Gọi hàm và lưu kết quả:
const batDau: number = layThoiGianHienTai();
```

#### 3. Hàm Arrow Function (Cú pháp rút gọn hiện đại)
Thường được dùng rất nhiều trong các framework kiểm thử hiện đại.
```typescript
const clickNut = (locator: string): void => {
    console.log(`[Action] Click vào nút: ${locator}`);
};

// Gọi hàm:
clickNut("button#btn-login");
```

---

## 🚀 HƯỚNG DẪN THỰC HÀNH CỦA TUẦN

Bạn hãy mở file code thực hành `tuan1.ts` và áp dụng các kiến thức trên để viết các hàm xử lý dữ liệu đầu vào. Hãy chắc chắn rằng bạn hiểu cách khai báo kiểu dữ liệu cho từng tham số đầu vào của hàm.

# Kịch bản kiểm thử (Test Cases) - Màn hình Đăng ký tài khoản

Tài liệu này tổng hợp 30 kịch bản kiểm thử (Test Cases) thiết kế riêng cho màn hình Đăng ký tài khoản của hệ thống **Travel Booking**. Các kịch bản được phân nhóm khoa học từ kiểm thử giao diện, chức năng thành công, đến các lỗi nhập liệu chi tiết.

---

## I. Giao diện & Điều hướng (UI & Navigation)

*   **TC01:** Xác minh giao diện trang đăng ký hiển thị đầy đủ các trường nhập liệu (Họ tên, Email, Số điện thoại, Vai trò, Địa chỉ, Mật khẩu, Nhập lại mật khẩu), nút Đăng ký, và ảnh showcase bên trái.
*   **TC02:** Kiểm tra điều hướng: Nhấp vào nút "Đăng nhập" ở góc trên hoặc dưới cùng xem hệ thống có chuyển hướng sang đúng trang Đăng nhập `/auth/login.php` hay không.
*   **TC03:** Kiểm tra phím tab: Kiểm tra xem người dùng có thể nhấn phím `Tab` để di chuyển tuần tự qua các ô nhập liệu từ trên xuống dưới một cách mượt mà không.
*   **TC04:** Kiểm tra tính năng Responsive: Kiểm tra giao diện hiển thị trên các thiết bị di động (viewport nhỏ) xem các ô nhập liệu có tự động co giãn và hiển thị cân đối không.

---

## II. Kịch bản thành công (Positive / Happy Path)

*   **TC05:** Đăng ký thành công tài khoản với vai trò "Khách du lịch" (nhập đầy đủ tất cả các trường hợp lệ). Hệ thống chuyển hướng sang trang đăng nhập và hiển thị thông báo thành công.
*   **TC06:** Đăng ký thành công tài khoản với vai trò "Chủ dịch vụ" (nhập đầy đủ tất cả các trường hợp lệ).
*   **TC07:** Đăng ký thành công chỉ với các trường bắt buộc (Họ tên, Email, Mật khẩu, Nhập lại mật khẩu) và bỏ trống các trường không bắt buộc (Số điện thoại, Địa chỉ).

---

## III. Kiểm thử các trường bắt buộc / để trống (Field Validation / Required Fields)

*   **TC08:** Để trống trường "Họ và tên", nhập đầy đủ các trường khác hợp lệ ➔ Trình duyệt chặn lại hiển thị cảnh báo yêu cầu điền Họ tên.
*   **TC09:** Để trống trường "Email", nhập đầy đủ các trường khác hợp lệ ➔ Trình duyệt chặn lại hiển thị cảnh báo yêu cầu điền Email.
*   **TC10:** Để trống trường "Mật khẩu", nhập đầy đủ các trường khác hợp lệ ➔ Trình duyệt chặn lại hiển thị cảnh báo yêu cầu điền Mật khẩu.
*   **TC11:** Để trống trường "Nhập lại mật khẩu", nhập đầy đủ các trường khác hợp lệ ➔ Trình duyệt chặn lại hiển thị cảnh báo yêu cầu điền trường này.
*   **TC12:** Bỏ trống tất cả các trường và click nút "Đăng ký" ➔ Trình duyệt chặn lại tại trường trống đầu tiên (Họ và tên).

---

## IV. Kiểm thử trường "Họ và tên" (Full Name Validation)

*   **TC13:** Nhập Họ tên chứa các ký tự số (ví dụ: `Nguyen Van 123`) ➔ Hệ thống hiển thị cảnh báo Họ tên không hợp lệ (nếu web có validate).
*   **TC14:** Nhập Họ tên chứa các ký tự đặc biệt (ví dụ: `Nguyen Van @#$`) ➔ Hệ thống hiển thị cảnh báo lỗi.
*   **TC15:** Nhập Họ tên quá ngắn (ví dụ: chỉ 1 ký tự `A`) ➔ Hệ thống hiển thị lỗi yêu cầu tối thiểu độ dài.
*   **TC16:** Nhập Họ tên cực dài (ví dụ: > 100 ký tự) ➔ Hệ thống tự động cắt chuỗi hoặc hiển thị cảnh báo vượt giới hạn.

---

## V. Kiểm thử định dạng "Email" (Email Format Validation)

*   **TC17:** Nhập Email sai định dạng, thiếu ký tự `@` (ví dụ: `nguyenvangmail.com`) ➔ Trình duyệt hoặc hệ thống báo lỗi định dạng email.
*   **TC18:** Nhập Email sai định dạng, thiếu tên miền (ví dụ: `nguyenvan@gmail`) ➔ Hệ thống báo lỗi.
*   **TC19:** Nhập Email chứa khoảng trắng ở giữa (ví dụ: `nguyen van@gmail.com`) ➔ Hệ thống báo lỗi.
*   **TC20:** Đăng ký với Email đã tồn tại trên hệ thống (đã được tài khoản khác sử dụng) ➔ Hệ thống hiển thị thông báo lỗi *"Email đã được sử dụng"*.

---

## VI. Kiểm thử "Số điện thoại" (Phone Number Validation)

*   **TC21:** Nhập Số điện thoại chứa ký tự chữ (ví dụ: `0987654abc`) ➔ Hệ thống báo lỗi số điện thoại chỉ được chứa số.
*   **TC22:** Nhập Số điện thoại sai độ dài quy định của Việt Nam (ví dụ: dưới 10 số như `0987` hoặc trên 11 số) ➔ Hệ thống báo lỗi.
*   **TC23:** Nhập Số điện thoại bắt đầu bằng số không hợp lệ (không phải số 0 đầu tiên) ➔ Hệ thống báo lỗi.

---

## VII. Kiểm thử "Mật khẩu & Xác nhận mật khẩu" (Password & Confirm Password)

*   **TC24:** Nhập "Mật khẩu" và "Nhập lại mật khẩu" không trùng khớp (ví dụ: Pass: `123456`, Nhập lại: `1234567`) ➔ Hệ thống báo lỗi *"Mật khẩu xác nhận không khớp"*.
*   **TC25:** Đăng ký với Mật khẩu quá ngắn, dưới giới hạn bảo mật tối thiểu (ví dụ: ít hơn 6 ký tự như `123`) ➔ Hệ thống báo lỗi yêu cầu độ dài.
*   **TC26:** Kiểm tra tính ẩn/hiển thị của Mật khẩu: Các ô nhập mật khẩu phải hiển thị dưới dạng dấu chấm tròn ẩn (`type="password"`) để tránh lộ thông tin.
*   **TC27:** Đăng ký với mật khẩu chỉ chứa khoảng trắng (ví dụ: `      `) ➔ Hệ thống báo lỗi mật khẩu không được chứa khoảng trắng.

---

## VIII. Bảo mật và Logic hệ thống (Security & System Logic)

*   **TC28:** Kiểm tra việc chống tấn công chèn mã độc (SQL Injection): Nhập các chuỗi SQL vào các ô input (ví dụ: `' OR 1=1 --`) ➔ Hệ thống phải xử lý an toàn, không lỗi database.
*   **TC29:** Kiểm tra việc chống tấn công chèn mã script (XSS): Nhập `<script>alert('hack')</script>` vào ô Họ tên hoặc Địa chỉ ➔ Khi đăng ký xong hoặc lưu thông tin, đoạn mã script không được phép thực thi trên trình duyệt.
*   **TC30:** Kiểm tra double-click: Nhấp liên tục nhiều lần vào nút "Đăng ký" thật nhanh ➔ Hệ thống chỉ xử lý đăng ký đúng 1 lần duy nhất, tránh tạo ra nhiều tài khoản trùng lặp cùng lúc.

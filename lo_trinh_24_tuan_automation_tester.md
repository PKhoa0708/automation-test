# 🗺️ LỘ TRÌNH 24 TUẦN: AUTOMATION TESTER THỜI ĐẠI AI AGENT (PLAYWRIGHT & TYPESCRIPT)
*(Tư duy Hệ thống $\rightarrow$ Chỉ đạo & Đọc hiểu code AI $\rightarrow$ Đóng gói & Vận hành Framework)*

---

## 🛑 THÁNG 1: NỀN TẢNG TƯ DUY & GIÁM SÁT AI TƯƠNG TÁC UI

### Tuần 1: Tư duy Bất đồng bộ & Đọc hiểu Code TypeScript cơ bản
* **Kiến thức cần học:** Cơ chế bất đồng bộ (`Promise`, `async/await`), cách hoạt động của Event Loop trong JS/TS. Nhận diện cấu trúc khai báo biến (`let`, `const`), kiểu dữ liệu và hàm cơ bản.
* **Hành động trên dự án:** Khởi tạo dự án NodeJS, cài đặt TypeScript/TSX. Viết và đọc hiểu code giả lập trễ mạng bằng hàm `sleep`.
* **Kỹ năng AI:** Học cách đọc, hiểu cấu trúc code TS do AI sinh ra. Phân tích tại sao thiếu `await` sẽ làm kịch bản test bị lỗi (mặc dù code không hề sai cú pháp).
* **Kết quả đầu ra (Milestone):** Hiểu rõ cơ chế đợi bất đồng bộ. Chạy thành công file script TS bằng lệnh `npx tsx`.

### Tuần 2: Kiến trúc Playwright & Chiến lược Nhận diện Phần tử (Selectors)
* **Kiến thức cần học:** Kiến trúc Playwright (Browser Context, Page). Các phương pháp chọn phần tử: Locator chuẩn (`getByRole`, `getByText`, `getByPlaceholder`) và CSS Selector.
* **Hành động trên dự án:** Mở giao diện Login dự án thật. Sử dụng Codegen để sinh code thô.
* **Kỹ năng AI:** Học cách viết prompt hướng dẫn AI tạo ra các locator thông minh, có tính chống chịu thay đổi (resilient selectors), thay vì sử dụng XPath tuyệt đối hoặc CSS Selector chập chờn do AI tự mò.
* **Kết quả đầu ra (Milestone):** Có kịch bản đăng nhập tự động điền form và click nút thành công.

### Tuần 3: Tương tác UI (Actions) & Đọc hiểu Xác thực Kết quả (Assertions)
* **Kiến thức cần học:** Các tương tác UI cơ bản (`.fill()`, `.click()`, `.check()`). Cơ chế tự động đợi (Auto-waiting) của Playwright. Khẳng định kết quả (`expect().toBeVisible()`, `expect().toHaveURL()`).
* **Hành động trên dự án:** Viết hoàn chỉnh kịch bản Login thành công (verify URL Dashboard) và thất bại (verify thông báo lỗi đỏ trên UI).
* **Kỹ năng AI:** Phân biệt "Khẳng định mạnh" (Auto-retrying assertions của Playwright) và "Khẳng định yếu" (kiểm tra điều kiện JS thông thường). Review xem code do AI viết có dùng đúng loại `expect` để tránh lỗi flaky test không.
* **Kết quả đầu ra (Milestone):** Có bộ test đăng nhập chuẩn, bắt được lỗi giao diện thực tế.

### Tuần 4: Thiết lập Môi trường & Chạy Test Đa Thiết Bị (Responsive)
* **Kiến thức cần học:** Cấu trúc `test.describe()`, Hook `test.beforeEach()`. Tệp cấu hình `playwright.config.ts` để giả lập các thiết bị Mobile Web (iPhone, Pixel).
* **Hành động trên dự án:** Cấu hình chạy song song bộ test đăng nhập trên cả Desktop Chrome và Mobile Safari.
* **Kỹ năng AI:** Chỉ đạo AI tối ưu hóa tệp cấu hình config của Playwright để thiết lập các biến môi trường, song song hóa và giả lập thiết bị.
* **Kết quả đầu ra (Milestone):** Bộ test chạy tự động trên nhiều trình duyệt và kích thước màn hình cùng lúc.

---

## 🏗️ THÁNG 2: KIẾN TRÚC FRAMEWORK & THIẾT KẾ DATA-DRIVEN (VAI TRÒ QUẢN TRỊ VIÊN)

### Tuần 5: Thiết kế Page Object Model (POM) - Review & Refactor Code AI
* **Kiến thức cần học:** Lập trình hướng đối tượng cơ bản trong TS (`Class`, `Constructor`, `Methods`). Mô hình Page Object Model (POM) tách biệt lớp Locator/Action ra khỏi lớp Kịch bản test.
* **Hành động trên dự án:** Tạo cấu trúc thư mục `pages/`. Viết class `LoginPage.ts`.
* **Kỹ năng AI:** Yêu cầu AI viết nhanh các file Page Class cho toàn bộ dự án. Đóng vai trò kiểm duyệt viên (Code Reviewer) để tinh chỉnh: lọc bỏ các locator thừa, gộp các hành động trùng lặp và tối ưu hóa tính tái sử dụng của Class.
* **Kết quả đầu ra (Milestone):** Cấu trúc dự án sạch sẽ, đổi giao diện chỉ cần sửa code ở duy nhất 1 file Page.

### Tuần 6: Quản lý Test Data & Khử Hardcode
* **Kiến thức cần học:** Làm việc với dữ liệu JSON/CSV. Quản lý cấu hình đa môi trường (Staging, UAT, Production) bằng file `.env` và thư viện `dotenv`.
* **Hành động trên dự án:** Tạo file `loginData.json` chứa các bộ dữ liệu test. Thiết kế test case chạy lặp qua các bộ data này.
* **Kỹ năng AI:** Chỉ đạo AI viết các script sinh dữ liệu test tự động (Fake data) và đọc/ghi file dữ liệu cấu hình.
* **Kết quả đầu ra (Milestone):** Chạy 1 test case với nhiều bộ dữ liệu khác nhau chỉ bằng việc đổi câu lệnh Terminal.

### Tuần 7: Tối ưu Tốc độ bằng State Management (Bypass Login)
* **Kiến thức cần học:** Cách trình duyệt lưu phiên làm việc (Cookies, Session/Local Storage). Tính năng `storageState` trong Playwright.
* **Hành động trên dự án:** Cấu hình file `auth.setup.ts` để đăng nhập 1 lần duy nhất, lưu phiên và nạp lại cho tất cả các bài test chức năng phía sau.
* **Kỹ năng AI:** Hiểu cơ chế chia sẻ Session của Playwright để giám sát AI cấu hình đúng luồng thiết lập bảo mật.
* **Kết quả đầu ra (Milestone):** Rút ngắn 70% thời gian chạy test suite vì bỏ qua bước đăng nhập lặp đi lặp lại.

### Tuần 8: Tương tác UI Nâng cao & Giải quyết Bẫy Dynamic Elements
* **Kiến thức cần học:** Làm việc với Iframes, Multi-tabs/Windows, tải lên tệp tin (`setInputFiles`), Hover Menu phức tạp.
* **Hành động trên dự án:** Viết script cho các chức năng tải ảnh đại diện, click link mở tab mới và kiểm thử bảng dữ liệu phân trang.
* **Kỹ năng AI:** Cách xử lý khi AI viết code bị kẹt ở Iframe hoặc Dropdown động. Học cách debug và đưa ra prompt điều chỉnh (Refined prompt) để AI sửa lại logic tìm kiếm phần tử.
* **Kết quả đầu ra (Milestone):** Làm chủ việc tự động hóa trên mọi thành phần giao diện web phức tạp nhất.

---

## 🚀 THÁNG 3: LIÊN KẾT HỆ THỐNG & KIỂM THỬ API (HYBRID TESTING)

### Tuần 9: Ràng buộc Kiểu dữ liệu nâng cao (Interface, Type, Enum) cho Framework
* **Kiến thức cần học:** Cách định nghĩa cấu trúc dữ liệu chặt chẽ bằng `Interface` và `Type` trong TS. Quản lý trạng thái bằng `Enum`.
* **Hành động trên dự án:** Ép kiểu chặt chẽ cho toàn bộ dữ liệu test JSON đầu vào và kết quả trả về của các hàm POM.
* **Kỹ năng AI:** Dùng AI như một Linter thông minh để phát hiện các đoạn code lỏng lẻo (dùng kiểu `any`) và yêu cầu AI tự động đề xuất các `Interface`/`Type` tương ứng để tối ưu tính năng IntelliSense của IDE.
* **Kết quả đầu ra (Milestone):** Code có độ tin cậy cực cao, IDE tự động gợi ý chính xác tham số khi viết test mới.

### Tuần 10: Xây dựng Bộ Kiểm thử API chuyên nghiệp
* **Kiến thức cần học:** Fixture `request` của Playwright. Cách gửi các phương thức `GET`, `POST`, `PUT`, `DELETE`. Kiểm tra mã trạng thái (Status Code) và cấu trúc JSON trả về.
* **Hành động trên dự án:** Viết bộ test API xác thực các luồng xử lý dữ liệu ở Backend (ví dụ: tạo, cập nhật, xóa tài khoản thông qua API).
* **Kỹ năng AI:** Yêu cầu AI viết nhanh các đoạn mã kiểm thử API dựa trên tài liệu API (Swagger/Postman JSON). Bạn đóng vai trò rà soát các trường hợp biên (Edge cases).
* **Kết quả đầu ra (Milestone):** Có bộ test API độc lập chạy siêu tốc để bảo vệ logic Backend.

### Tuần 11: Hybrid Testing (Sự kết hợp đỉnh cao giữa API & UI)
* **Kiến thức cần học:** Kỹ thuật tạo dữ liệu mồi (Data seeding) qua API để rút ngắn thời gian kiểm thử giao diện UI.
* **Hành động trên dự án:** Viết script: Gọi API tạo một bài viết mới $\rightarrow$ Lấy ID trả về $\rightarrow$ Dùng trình duyệt nhảy thẳng vào trang UI của bài viết đó để verify hiển thị.
* **Kỹ năng AI:** Thiết kế luồng tích hợp (Workflow). Giải thích luồng nghiệp vụ cho AI và yêu cầu AI viết mã nguồn kết nối API request với trình duyệt Playwright.
* **Kết quả đầu ra (Milestone):** Tối ưu hóa tốc độ kiểm thử tổng thể, không còn phải thao tác tay tạo dữ liệu qua UI.

### Tuần 12: Quản lý Cấu hình Nâng cao (Projects, Retries & Traces)
* **Kiến thức cần học:** Cấu hình cơ chế chạy lại khi lỗi (`retries`), tự động quay phim/chụp ảnh màn hình khi test thất bại. Sử dụng công cụ Trace Viewer để phân tích nguyên nhân lỗi.
* **Hành động trên dự án:** Tối ưu hóa file cấu hình hệ thống, chạy kiểm thử chéo trình duyệt trên diện rộng.
* **Kỹ năng AI:** Cung cấp file Trace/Log lỗi cho AI và yêu cầu AI phân tích lý do test bị sập để đưa ra giải pháp sửa đổi.
* **Kết quả đầu ra (Milestone):** Framework tự động sinh báo cáo trực quan kèm bằng chứng video/ảnh chụp chi tiết khi có lỗi.

---

## 🤖 THÁNG 4: HỘI NHẬP CI/CD & VẬN HÀNH DOCKER TỰ ĐỘNG

### Tuần 13: Git Teamwork & Quy trình Đánh giá Code (Code Review)
* **Kiến thức cần học:** Quản lý nhánh (`git checkout -b`), đồng bộ code (`pull`, `push`), cách giải quyết xung đột (Git Conflicts) và quy trình tạo Pull Request (PR) chuẩn.
* **Hành động trên dự án:** Đẩy dự án lên GitHub. Tạo quy trình kiểm soát chất lượng code.
* **Kỹ năng AI:** Sử dụng AI để viết các mẫu Pull Request Description chuyên nghiệp. Dùng AI làm trợ lý phân tích và giải thích các đoạn mã bị conflict để chọn giải pháp an toàn nhất.
* **Kết quả đầu ra (Milestone):** Dự án được quản lý an toàn trên Github, sẵn sàng cho nhiều người cùng tham gia đóng góp code.

### Tuần 14 & 15: Tự động hóa Pipeline CI/CD (GitHub Actions / GitLab CI)
* **Kiến thức cần học:** Cú pháp YAML cấu hình luồng chạy CI/CD. Cách tự động kích hoạt bộ test chạy khi có code mới (Push/PR) hoặc chạy định kỳ hàng đêm (Cron Job). Cách xuất báo cáo HTML lên đám mây sau khi kết thúc.
* **Hành động trên dự án:** Tạo file `.github/workflows/playwright.yml` để chạy test tự động trên máy ảo GitHub.
* **Kỹ năng AI:** Sử dụng AI để sinh mã YAML cho pipeline. Bạn đóng vai trò giám sát các tài nguyên máy ảo để tránh chi phí phát sinh hoặc tối ưu thời gian chạy.
* **Kết quả đầu ra (Milestone):** Bộ test tự động chạy và gửi báo cáo mỗi khi nhóm phát triển cập nhật mã nguồn dự án.

### Tuần 16: Docker hóa Framework - Độc lập Môi trường Chạy
* **Kiến thức cần học:** Khái niệm Containerization, Dockerfile. Cách đóng gói toàn bộ Framework và trình duyệt vào một Image Docker chuẩn.
* **Hành động trên dự án:** Viết file `Dockerfile`, dựng container chạy test hoàn chỉnh dưới máy cá nhân.
* **Kỹ năng AI:** Yêu cầu AI viết và tối ưu hóa tệp `Dockerfile` dựa trên phiên bản Node.js và Playwright đang dùng.
* **Kết quả đầu ra (Milestone):** Đảm bảo tính nhất quán tuyệt đối của bộ test: Chạy trên máy dev, máy QA hay trên Cloud CI/CD đều ra cùng một kết quả.

---

## 🛠️ THÁNG 5: TƯ DUY KIẾN TRÚC SƯ & CHIẾN THUẬT TRIỆT TIÊU FLAKY TEST

### Tuần 17 & 18: Nâng cấp Framework với Custom Fixtures (Dependency Injection)
* **Kiến thức cần học:** Cách hoạt động của Dependency Injection. Cơ chế mở rộng `test.extend()` của Playwright để thay thế hoàn toàn việc khởi tạo POM thủ công trong file test.
* **Hành động trên dự án:** Viết các custom fixtures như `adminPage`, `customerPage` để tự động hóa khâu nạp thông tin đăng nhập và trạng thái trang tương ứng.
* **Kỹ năng AI:** Yêu cầu AI chuyển đổi mã nguồn từ POM truyền thống sang Fixture-based. Bạn đóng vai trò kiểm thử tính cô lập dữ liệu khi chạy song song.
* **Kết quả đầu ra (Milestone):** Code test ngắn gọn đến mức tối đa, các file test chỉ tập trung vào nghiệp vụ chứ không cần khai báo khởi tạo đối tượng nữa.

### Tuần 19: Chặn & Mock Dữ liệu Mạng (Network Interception / Mocking)
* **Kiến thức cần học:** Sử dụng hàm `page.route()` để chặn hoặc thay đổi dữ liệu từ API gửi về cho giao diện (Frontend).
* **Hành động trên dự án:** Viết kịch bản mock lỗi server (500 Error, 403 Forbidden) để kiểm tra xem giao diện UI hiển thị thông báo lỗi có đúng thiết kế không. Mock dữ liệu mảng rỗng để test giao diện trống.
* **Kỹ năng AI:** Hướng dẫn AI tạo ra các dữ liệu mock JSON chuẩn theo Schema của API để thực hiện kiểm thử giao diện mà không cần Backend thật hoạt động.
* **Kết quả đầu ra (Milestone):** Khả năng test các kịch bản khó (Edge Cases) cực kỳ nhanh chóng mà không làm ảnh hưởng đến cơ sở dữ liệu thật.

### Tuần 20: Chiến thuật Chống Flaky Test nâng cao (Trace Analysis & Smart Waits)
* **Kiến thức cần học:** Cách đọc hiểu chi tiết đồ thị mạng, console logs và ảnh chụp từ Trace Viewer để tìm nguyên nhân gốc của lỗi chạy chập chờn. Tuyệt đối cấm sử dụng các hàm dừng cứng (`waitForTimeout`).
* **Hành động trên dự án:** Dọn dẹp và tối ưu hóa các test case bị lỗi chập chờn (flaky) trên CI. Thay thế bằng các bộ đợi trạng thái thông minh (`page.waitForResponse`, `locator.waitFor`).
* **Kỹ năng AI:** Copy phần log lỗi chi tiết từ Trace Viewer và đưa cho AI để phân tích nguyên nhân tại sao element lúc ẩn lúc hiện, từ đó viết lại cơ chế đợi tối ưu nhất.
* **Kết quả đầu ra (Milestone):** Bộ test suite đạt độ tin cậy tuyệt đối (>98% thành công thực tế), chấm dứt hiện tượng báo động giả trên CI/CD.

---

## 🎓 THÁNG 6: TỐI ƯU HIỆU NĂNG & ĐÓNG GÓI CV CHINH PHỤC NHÀ TUYỂN DỤNG

### Tuần 21: Tăng tốc độ chạy bằng Sharding & Allure Reports chuyên nghiệp
* **Kiến thức cần học:** Kỹ thuật chia nhỏ bộ test chạy song song trên nhiều máy ảo CI độc lập (Sharding). Tích hợp Allure Report để tạo bảng phân tích lỗi có biểu đồ trực quan.
* **Hành động trên dự án:** Cấu hình GitHub Actions chia bộ test thành 3 máy ảo chạy đồng thời. Tạo link xem báo cáo Allure tự động.
* **Kỹ năng AI:** Yêu cầu AI viết các script tích hợp sinh và xuất dữ liệu báo cáo Allure tự động.
* **Kết quả đầu ra (Milestone):** Thời gian chạy toàn bộ bộ test giảm từ hàng giờ xuống còn vài phút. Báo cáo gửi sếp chuyên nghiệp.

### Tuần 22: Visual Regression Testing (Kiểm thử Giao diện bằng Hình ảnh)
* **Kiến thức cần học:** Cách thiết lập chụp ảnh màn hình so sánh pixel-by-pixel bằng lệnh `expect(page).toHaveScreenshot()`. Cơ chế cập nhật ảnh mẫu gốc (Baseline Snapshot).
* **Hành động trên dự án:** Áp dụng kiểm thử hình ảnh cho các trang Landing Page hoặc báo cáo hóa đơn của dự án để phát hiện lỗi vỡ layout hoặc sai font chữ.
* **Kỹ năng AI:** Hiểu cách Playwright xử lý so sánh ảnh trên các môi trường OS khác nhau để hướng dẫn AI cấu hình độ lệch cho phép (threshold) phù hợp.
* **Kết quả đầu ra (Milestone):** Sở hữu công cụ phát hiện lỗi lệch giao diện dù chỉ 1 pixel mà code logic không bắt được.

### Tuần 23 & 24: Đóng gói Framework, Tài liệu hóa dự án & Viết CV cùng AI
* **Kiến thức cần học:** Cách viết file `README.md` chuyên nghiệp (kiến trúc framework, hướng dẫn cài đặt, cách chạy test). Các bộ câu hỏi phỏng vấn vị trí Middle Automation Tester.
* **Hành động trên dự án:** Dọn dẹp lại toàn bộ mã nguồn dự án. Đóng gói mã nguồn thành một sản phẩm mẫu (Showcase) đẹp mắt trên GitHub.
* **Kỹ năng AI:** 
  1. Sử dụng AI để sinh cấu trúc tài liệu `README.md` chuyên nghiệp.
  2. Dùng AI làm nhà tuyển dụng phỏng vấn giả lập (Mock Interview) để luyện trả lời các câu hỏi về kiến trúc và cách xử lý sự cố.
  3. Dùng AI tối ưu hóa CV dựa trên số liệu thực tế từ dự án mẫu bạn đã làm.
* **Kết quả đầu ra (Milestone):** Sở hữu một profile cá nhân chuyên nghiệp, sẵn sàng ứng tuyển vị trí Middle Automation Tester với mức lương mong muốn.

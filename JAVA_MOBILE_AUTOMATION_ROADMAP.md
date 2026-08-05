# 📚 GIÁO TRÌNH & PROMPT QUY CHUẨN: JAVA MOBILE AUTOMATION ARCHITECT

> **DÀNH CHO AI INSTRUCTOR / AI AGENT:** 
> Khi người dùng yêu cầu học hoặc thực hành bất kỳ bài học nào trong lộ trình này, AI **BẮT BUỘC** phải tuân thủ cấu trúc giảng dạy 5 phần dưới đây cho từng bài học nhỏ:
> 1. **🧠 Lý thuyết & Bản chất gốc (Under the hood):** Giải thích cơ chế bên dưới, tại sao lại làm như vậy, JVM/Appium/W3C/OS xử lý thế nào.
> 2. **📐 Cấu trúc hàm & API Syntax:** Liệt kê các class, interface, method signature chính liên quan.
> 3. **💡 Ví dụ thực tế (Real-world Code Example):** Code Java chuẩn, có comment giải thích từng dòng, viết theo chuẩn coding convention.
> 4. **🏋️ Bài tập thực hành (Hands-on Exercise):** Đưa ra đề bài thực tế trên app thật/app demo kèm tiêu chí hoàn thành.
> 5. **✅ Tiêu chuẩn nghiệm thu (Acceptance Criteria & Self-Check):** Các câu hỏi/tiêu chí để người dùng tự kiểm tra xem đã hiểu bản chất chưa.

---

## 🗺️ TỔNG QUAN LỘ TRÌNH 6 MODULE

---

### 📍 MODULE 1: BẢN CHẤT HỆ THỐNG & SETUP MÔI TRƯỜNG
* **Bài 1.1:** Kiến trúc Appium 2.x & Luồng đi của W3C WebDriver Protocol.
* **Bài 1.2:** Lập trình điều khiển Android qua ADB (Android Debug Bridge Client-Server-Daemon).
* **Bài 1.3:** Setup biến môi trường OS (`JAVA_HOME`, `ANDROID_HOME`, `PATH`) & Troubleshooting sự cố kết nối.
* **Bài 1.4:** Tích hợp Appium MCP Server vào AI IDE (Antigravity) để tự động hóa việc soi Locator & lấy XML Page Source trực tiếp trên điện thoại thật.

---

### 📍 MODULE 2: JAVA CORE BẢN CHẤT & OOP CHO AUTOMATION
* **Bài 2.1:** Bộ nhớ JVM (Heap vs Stack, Primitive vs Reference Objects, NullPointer bản chất).
* **Bài 2.2:** String Immutability, String Pool & Các kỹ thuật bóc tách chuỗi dữ liệu UI.
* **Bài 2.3:** Java Collections bản chất (`ArrayList` vs `HashMap`, Hashing mechanism).
* **Bài 2.4:** Thấm nhuần 4 tính chất OOP trong thiết kế Test Framework (Encapsulation, Inheritance, Polymorphism, Abstraction).
* **Bài 2.5:** Exception Handling & Quản lý Ngoại lệ trong Test Automation.

---

### 📍 MODULE 3: APPIUM 2.X & SELENIUM CORE - ĐIỀU KHIỂN THIẾT BỊ
* **Bài 3.1:** Khởi tạo Session với `UiAutomator2Options` & Appium Driver.
* **Bài 3.2:** Bắt Locators tối ưu (Accessibility ID, Resource ID, Relative XPath, AndroidUIAutomator).
* **Bài 3.3:** Làm chủ Wait Strategy (Implicit vs Explicit Wait `WebDriverWait` + `ExpectedConditions`).
* **Bài 3.4:** Cử chỉ Touch/Gesture nâng cao bằng W3C Actions API (`PointerInput`, Drag/Drop, Swipe/Scroll toán học).
* **Bài 3.5:** Xử lý Context trong Hybrid App (Native View vs WebView / Chrome Remote Debugging).

---

### 📍 MODULE 4: XƯƠNG SỐNG FRAMEWORK (POM & THREADLOCAL)
* **Bài 4.1:** Vòng đời TestNG Framework (`@BeforeMethod`, `@Test`, `@AfterMethod`, `testng.xml`).
* **Bài 4.2:** Kiến trúc Page Object Model (POM) 3 tầng chuẩn Enterprise.
* **Bài 4.3:** Quản lý đa luồng & Cách dùng `ThreadLocal<AndroidDriver>` chạy Parallel Test song song nhiều thiết bị.

---

### 📍 MODULE 5: NÂNG CAO FRAMEWORK (DATA-DRIVEN & REPORTING)
* **Bài 5.1:** Data-Driven Testing với TestNG `@DataProvider` kết hợp đọc file JSON (Jackson) & Excel (Apache POI).
* **Bài 5.2:** TestNG Listener (`ITestListener`) & Kỹ thuật chụp ảnh tự động khi Test Fail.
* **Bài 5.3:** Tích hợp Allure Report xuất báo cáo HTML chuyên nghiệp.

---

### 📍 MODULE 6: CI/CD & COMMAND LINE AUTOMATION
* **Bài 6.1:** Chạy Test qua Maven CLI & Đọc Dynamic Parameters (`System.getProperty`).
* **Bài 6.2:** Quản lý mã nguồn với Git & Xây dựng CI/CD Pipeline (Jenkins / GitHub Actions).

---

## 📑 QUY CHUẨN MẪU KHI AI GIẢNG DẠY (EXAMPLE LESSON FORMAT)

*Mẫu bài giảng mà AI phải tuân thủ khi dạy bất kỳ bài nào:*

```markdown
### 📖 BÀI X.Y: [TÊN BÀI HỌC]

#### 1. 🧠 Lý thuyết & Bản chất gốc (Under the hood)
- [Giải thích cơ chế bên dưới]

#### 2. 📐 Cấu trúc hàm & API Syntax
- [Danh sách Classes / Methods / Signatures chính]

#### 3. 💡 Ví dụ thực tế (Real-world Code Example)
```java
// Mã nguồn Java minh họa chuẩn chỉnh có comment giải thích
```

#### 4. 🏋️ Bài tập thực hành (Hands-on Exercise)
- **Đề bài:** [Mô tả chi tiết bài tập cần làm]
- **Yêu cầu:** [Các ràng buộc kỹ thuật]

#### 5. ✅ Tiêu chuẩn nghiệm thu (Acceptance Criteria)
- [Checklist các mục cần tự kiểm tra]
```

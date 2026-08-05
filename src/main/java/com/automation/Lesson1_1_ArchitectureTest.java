package com.automation;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class Lesson1_1_ArchitectureTest {

    public static void main(String[] args) {
        // 1. Cấu hình W3C Capabilities qua UiAutomator2Options (Appium 2.x Standard)
        UiAutomator2Options options = new UiAutomator2Options();
        options.setPlatformName("Android") // Chuẩn W3C: platformName
               .setAutomationName("UiAutomator2") // Chỉ định driver driver của Android
               .setDeviceName("954e8d82") // UDID thiết bị thật Xiaomi 23049RAD8C
               .setAppPackage("com.android.settings") // App mẫu: Settings của Android
               .setAppActivity(".MainSettings") // Exact main activity trên Xiaomi
               .setNoReset(true); // Không xóa data app trước khi test

        AndroidDriver driver = null;

        try {
            // 2. Khởi tạo URL trỏ tới Appium Server 2.x (Chạy tại port 4723)
            URL appiumServerUrl = new URL("http://127.0.0.1:4723/");

            System.out.println("🚀 [CLIENT]: Gửi Request POST /session tới Appium Server...");
            driver = new AndroidDriver(appiumServerUrl, options);

            // Cấu hình Implicit Wait 10s
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            System.out.println("✅ [CLIENT]: Kết nối Session thành công! Session ID: " + driver.getSessionId());

            // 3. Thực hiện câu lệnh W3C Find Element tìm thanh Search/Item giao diện Settings
            System.out.println("🔍 [CLIENT]: Tìm element trên giao diện Settings...");
            
            // Dùng Locator linh hoạt theo resource-id hoặc class name (tương thích Xiaomi/Samsung/Stock Android)
            WebElement settingsElement = driver.findElement(By.xpath(
                "//*[contains(@resource-id,'search') or contains(@class,'EditText') or contains(@resource-id,'title')]"
            ));
            
            System.out.println("🎯 [CLIENT]: Đã tìm thấy element thành công!");
            System.out.println("   - Tag Name: " + settingsElement.getTagName());
            System.out.println("   - Text: " + settingsElement.getText());

        } catch (MalformedURLException e) {
            System.err.println("❌ URL Appium Server không hợp lệ: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("❌ Lỗi trong quá trình thực thi: " + e.getMessage());
        } finally {
            // 4. Đóng Session (Gửi DELETE /session/{id})
            if (driver != null) {
                System.out.println("🧹 [CLIENT]: Đóng session...");
                driver.quit();
            }
        }
    }
}

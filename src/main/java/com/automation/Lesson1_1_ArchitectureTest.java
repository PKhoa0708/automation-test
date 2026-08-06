package com.automation;

import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Map;

public class Lesson1_1_ArchitectureTest {

    public static void main(String[] args) {
        // 1. Cấu hình W3C Capabilities qua UiAutomator2Options (Appium 2.x Standard)
        UiAutomator2Options options = new UiAutomator2Options();
        options.setPlatformName("Android") // Chuẩn W3C: platformName
               .setAutomationName("UiAutomator2") // Chỉ định driver driver của Android
               .setDeviceName("954e8d82") // Tên thiết bị
               .setUdid("954e8d82") // UDID chính xác từ 'adb devices'
               .setAppPackage("com.android.settings") // App mẫu: Settings của Android
               .setAppActivity(".MainSettings") // Exact main activity trên Xiaomi
               .setNoReset(true) // Không xóa data app trước khi test
               .setUiautomator2ServerInstallTimeout(Duration.ofSeconds(60))
               .setAppWaitDuration(Duration.ofSeconds(30));

        AndroidDriver driver = null;

        try {
            // 2. Khởi tạo URL trỏ tới Appium Server 2.x (Chạy tại port 4723)
            URL appiumServerUrl = new URL("http://127.0.0.1:4723/");

            System.out.println("[CLIENT]: Gui Request POST /session toi Appium Server...");
            driver = new AndroidDriver(appiumServerUrl, options);

            // Cấu hình Implicit Wait 10s
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            System.out.println("[CLIENT]: Ket noi session thanh cong! Session ID: " + driver.getSessionId());

            // 1. Nhấn phím HOME để đảm bảo điện thoại đang ở màn hình chính
            System.out.println("[CLIENT]: Nhan phim HOME ve trang chu...");
            driver.executeScript("mobile: pressKey", Map.of("keycode", 3));

            // 2. Thực hiện câu lệnh W3C Find Element tìm icon Settings
            System.out.println("[CLIENT]: Tim icon Settings tren trang chu...");
            WebElement settingsApp = driver.findElement(AppiumBy.accessibilityId("Settings"));
            System.out.println("[CLIENT]: Da tim thay element thanh cong!");
            System.out.println("   - Thuc hien click vao element...");
            settingsApp.click();

        } catch (MalformedURLException e) {
            System.err.println("URL Appium Server khong hop le: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Loi chi tiet trong qua trinh thuc thi:");
            e.printStackTrace();
        } finally {
            // 3. Đóng Session (Gửi DELETE /session/{id})
            if (driver != null) {
                System.out.println("[CLIENT]: Dong session...");
                driver.quit();
            }
        }
    }
}

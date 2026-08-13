package com.automation;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;

/**
 * [BÀI 1.2]: Lập trình điều khiển Android qua ADB Client-Server-Daemon
 * Tối ưu: Code ngắn gọn, dùng Java 17 Stream API, hỗ trợ đọc tham số động (System Property / CLI / Auto-detect).
 */
public class Lesson1_2_ADBController {

    private static final String DEFAULT_PROP_OS_VERSION = "ro.build.version.release";
    private static final String KEYCODE_HOME = "3";

    public static List<String> executeADBCommand(String... command) {
        try {
            Process process = new ProcessBuilder(command).redirectErrorStream(true).start();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                List<String> output = reader.lines().map(String::trim).filter(l -> !l.isEmpty()).toList();
                if (process.waitFor() != 0) {
                    System.err.println("⚠️ [ADB WARN]: Mã thoát: " + process.exitValue());
                }
                return output;
            }
        } catch (Exception e) {
            System.err.println("❌ [ADB ERROR]: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Tự động quét và lấy UDID thiết bị Android đang kết nối đầu tiên
     */
    public static String getFirstConnectedDeviceUdid() {
        return executeADBCommand("adb", "devices").stream()
                .filter(line -> line.endsWith("device") && !line.startsWith("List of devices"))
                .map(line -> line.split("\\s+")[0])
                .findFirst()
                .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy thiết bị Android nào kết nối qua ADB!"));
    }

    /**
     * Lấy thuộc tính phiên bản OS Android
     */
    public static String getAndroidVersion(String udid) {
        String propKey = System.getProperty("os.prop", DEFAULT_PROP_OS_VERSION);
        List<String> output = executeADBCommand("adb", "-s", udid, "shell", "getprop", propKey);
        return output.isEmpty() ? "Unknown" : output.get(0);
    }

    /**
     * Gửi sự kiện phím (Keyevent) tới thiết bị
     */
    public static void sendKeyEvent(String udid, String keycode) {
        executeADBCommand("adb", "-s", udid, "shell", "input", "keyevent", keycode);
    }

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("🚀 [BÀI 1.2]: ADB CONTROLLER (DYNAMIC & CONCISE)");
        System.out.println("==================================================");

        // 1. Đọc UDID từ System Property / CLI argument, nếu không truyền sẽ tự động Auto-Detect (Không hardcode)
        String targetUdid = System.getProperty("udid", args.length > 0 ? args[0] : getFirstConnectedDeviceUdid());
        System.out.println("✅ [ADB TARGET DEVICE]: UDID = " + targetUdid);

        // 2. Lấy phiên bản Android OS
        String osVersion = getAndroidVersion(targetUdid);
        System.out.println("📱 [DEVICE OS VERSION]: Android " + osVersion);

        // 3. Đọc Keycode linh hoạt từ System Property hoặc mặc định phím HOME (Keycode 3)
        String keycode = System.getProperty("keycode", KEYCODE_HOME);
        System.out.println("👆 [ADB ACTION]: Gửi Keycode '" + keycode + "'...");
        sendKeyEvent(targetUdid, keycode);
        System.out.println("🎯 [ADB SUCCESS]: Đã điều khiển thiết bị thành công qua ADB!");
    }
}

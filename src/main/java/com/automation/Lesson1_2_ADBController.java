package com.automation;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Lesson1_2_ADBController {

    /**
     * Thực thi lệnh ADB CLI từ Java ProcessBuilder
     *
     * @param command Mảng các tham số lệnh ADB (ví dụ: "adb", "devices")
     * @return Output chuỗi kết quả trả về từ ADB Server
     */
    public static List<String> executeADBCommand(String... command) {
        List<String> output = new ArrayList<>();
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.redirectErrorStream(true); // Gộp stderr vào stdout
            Process process = processBuilder.start();

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    if (!line.trim().isEmpty()) {
                        output.add(line.trim());
                    }
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("⚠️ [ADB WARN]: Lệnh thoát với mã lỗi: " + exitCode);
            }
        } catch (Exception e) {
            System.err.println("❌ [ADB ERROR]: Không thể thực thi lệnh ADB: " + e.getMessage());
        }
        return output;
    }

    /**
     * Tự động quét và lấy UDID thiết bị Android đang kết nối đầu tiên (Auto-Detect)
     */
    public static String getFirstConnectedDeviceUdid() {
        List<String> output = executeADBCommand("adb", "devices");
        for (String line : output) {
            if (line.endsWith("device") && !line.startsWith("List of devices")) {
                return line.split("\\s+")[0]; // Tách lấy chuỗi UDID trước dấu khoảng trắng
            }
        }
        throw new RuntimeException("❌ Không tìm thấy thiết bị Android nào đang kết nối qua ADB!");
    }

    /**
     * Lấy tên phiên bản Android OS (ví dụ: "15")
     */
    public static String getAndroidVersion(String udid) {
        List<String> output = executeADBCommand("adb", "-s", udid, "shell", "getprop", "ro.build.version.release");
        return output.isEmpty() ? "Unknown" : output.get(0);
    }

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("🚀 [BÀI 1.2]: KIỂM TRA & QUẢN LÝ THIẾT BỊ QUA ADB");
        System.out.println("==================================================");

        // 1. Tự động Dò tìm UDID thiết bị đang cắm (Auto-Detect)
        String udid = getFirstConnectedDeviceUdid();
        System.out.println("✅ [ADB AUTO-DETECT]: Đã phát hiện thiết bị UDID: " + udid);

        // 2. Đọc thông tin OS Version
        String osVersion = getAndroidVersion(udid);
        System.out.println("📱 [DEVICE INFO]: Phiên bản Android OS: " + osVersion);

        // 3. Thực thi lệnh ADB Shell gửi phím HOME về màn hình chính
        System.out.println("👆 [ADB ACTION]: Gửi lệnh 'adb shell input keyevent 3' (HOME)...");
        executeADBCommand("adb", "-s", udid, "shell", "input", "keyevent", "3");
        System.out.println("🎯 [ADB SUCCESS]: Đã điều khiển thiết bị thành công qua ADB Daemon!");
    }
}

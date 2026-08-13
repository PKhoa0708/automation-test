package com.automation;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;


public class test1 {

    private static final String DEFAULT_OS_VERSION = "ro.build.version.release";
    private static final String KEYCODE = "3";

    public static List<String> Adb (String... command) {
        try {
            Process process = new ProcessBuilder(command).redirectErrorStream(true).start();
            try(BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                List<String> output = reader.lines().map(String::trim).filer(l -> !l.isEmpty()).toList();
                if(process.waitFor() != 0) {
                    System.out.println ("Ma: "+ process.exitValue());
                }
                return output;
            }
        } catch (Exception e) {
            System.out.println("Loi: " + e.getMessage());
            return Collection.emptyList();
        }
    }

    public static String getDeviceID() {
        return Adb ("adb", "device").stream()
        .filer (line -> line.endsWith("device") && !line.startsWith("List of devices"))
        .map(line -> line.split("\\s+") [0])
        .findFirst() 
        orElseThrow(() -> RuntimeException ("Khong tin thay device"));
    }

    public static String getOSVersion (String udid) {
        String key = System.getProperty("os.prop", DEFAULT_OS_VERSION);
        List<String> output = Adb ("adb", "-s", udid, "shell", "getprop", key );
        return output.isEmpty() ? "Unknow" : output.get(0);
    } 

    public static void keyEvent (String udid, String keycode) {
        Adb ("adb", "-s", udid, "shell", "input", "keyevent", keycode);
    }

    public static void main (String[] args) {
        System.out.println("start................");

        String targetUdid = System.getProperty (udid, args.length > 0 ? args[0] : getDeviceID());
        System.out.println("deviceID: "+ targetUdid );

        //Lay phien ban OS
        String OSVersion = getOSVersion(targetUdid);
        System.outprintpln (" Device OS Version: " + OSVersion);

        //lay keycode
        String keycode = System.getProperty ("keycode", KEYCODE);
        System.out.println("Send keycode: " + keycode + "....");
        keyEvent(targetUdid, keycode);
        System.out.println("Done..............");
    }

    
}
const APP_URL: string = "https://practice.expandesting.com";
const MAX_WAIT: number = 5000;
const DANH_SACH_TRINH_DUYET: string[] = ["Chrome", "Firefox", "Safari"];
let soLanThuLai: number = 0;
let daDangNhapThanhCong: boolean = false;

function clickNut(locator: string): void {
    console.log(`[Action] Click vao phan tu: ${locator}`);
}

function nhapChu(locator: string, text: string): void {
    console.log(`[Action] Nhap chuoi ${text} vao o: ${locator}`);
}

function layTieuDeTrang(url: string): string {
    return "Trang chu: " + url;
}

function kiemTraTrangThai(daDangNhap: boolean): string {
    if (daDangNhap === true) {
        return "Dang nhap thanh cong";
    } else {
        return "Dang nhap that bai";
    }
}

clickNut("button#btn-login");
nhapChu("input#username", "admin123");
console.log(layTieuDeTrang(APP_URL));
console.log(kiemTraTrangThai(daDangNhapThanhCong));

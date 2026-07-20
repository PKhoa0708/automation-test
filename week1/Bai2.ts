function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clickNutasync(locator: string): Promise<void> {
    console.log(`[Start] dang tim phan tu: ${locator}`);
    await sleep (2000);
    console.log(`[Done] da click vao phan tu: ${locator}`);
}

async function layDuLieuTuAPI(): Promise<string> {
    console.log(`[API] Dang gui request`);
    await sleep(3000);
    return "Du lieu tra ve tu API: Dang nhap thanh cong"

}

async function chayKichBanTest() {
    console.log("Bat dau chay kich ban test");
    await clickNutasync("button#btn-login");
    const ketQua = await layDuLieuTuAPI();
    console.log(ketQua);
    console.log("Ket thuc chay ban test");
}

chayKichBanTest();

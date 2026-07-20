// Hãy tự gõ code bài tập 3 (Bài tập nâng cao Tuần 1) vào đây theo hướng dẫn ở chat
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clickNutRandom(locator: string): Promise<boolean> {
    console.log(`Dang click nut ${locator}`);
    await sleep(1000);
    const ngauNhien = Math.random();
    if (ngauNhien > 0.8) {
        console.log("Click thanh cong");
        return true;
    } else {
        console.log("Click that bai");
        return false;
    }

}

    async function chayTestVoiRetry (locator: string, maxRetries: number): Promise<void> {
        console.log("BAT DAU CHAY TEST");
        for (let i = 1; i <= maxRetries; i++) {
            console.log(`Lan thu ${i}`);

            const thanhCong: boolean = await clickNutRandom(locator); 
           
            if(thanhCong == true) {
                console.log(`Da hoan thanh test sau lan thu ${i}`);
                return;
            }
            
            if (i < maxRetries)  {
                    await sleep(1500);
                }                 
            }
            console.log(`That bai sau ${maxRetries} lan thu`);
        }
    chayTestVoiRetry("button#checkout", 10);

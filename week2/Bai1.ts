//import thư viện {test, expect}
import {test, expect } from '@playwright/test';
// gom các nhóm test case
test.describe('Kiểm thử chức năng đăng nhập', () => {
    test.beforeEach(async ( {page} ) => {
        await page.goto('https://dashboard.staging.one-liver.net/');
    })

    test('TC01: Dang nhap thanh cong', async ({page}) => {
        await page.getByLabel('アカウントID')
    })
})
// khai báo từng test case (các action, assertion)
import { test, expect } from '@playwright/test';
import loginData from './login-data.json' assert { type: 'json' };

test.describe.configure({ mode: 'parallel' });

for (const data of loginData) {

    test(`Login - ${data.CaseName}`, async ({ page }) => {
        // 1. Đi tới trang chủ và click Đăng nhập
        await page.goto('/');
        await page.click('text=Đăng nhập');

        // 2. Điền Email và Password từ file JSON
        await page.fill('input[name="email"]', data.Email);
        await page.fill('input[name="password"]', data.Password);

        // 3. Click nút Đăng nhập trong form
        await page.click('.login-btn');

        // 4. Xác minh kết quả động theo thuộc tính "Type"
        if (data.Type === 'server_error') {
            // Nếu lỗi từ server: Kiểm tra thẻ báo lỗi đỏ xuất hiện
            const errorAlert = page.locator('.alert-error');
            await expect(errorAlert).toBeVisible();
            await expect(errorAlert).toContainText(data.ExpectedError);

        } else if (data.Type === 'validation_error') {
            // Nếu lỗi bỏ trống: URL vẫn ở trang đăng nhập, và thẻ báo lỗi đỏ KHÔNG xuất hiện
            await expect(page).toHaveURL(/\/auth\/login\.php/);
            const errorAlert = page.locator('.alert-error');
            await expect(errorAlert).not.toBeVisible();

        } else if (data.Type === 'success') {
            // Nếu đăng nhập thành công: URL chuyển về trang chủ, và thấy nút Đăng xuất
            await expect(page).toHaveURL('https://banve.my-board.org/dashboards/tourist.php');
            const logoutBtn = page.locator('text=Đăng xuất');
            await expect(logoutBtn).toBeVisible();
        }
    });

}

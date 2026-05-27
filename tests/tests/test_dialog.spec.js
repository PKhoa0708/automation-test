import { test } from '@playwright/test';

test('Dump new HTML', async ({ page }) => {
  await page.goto('https://banve.my-board.org/auth/register.php');
  const bodyHtml = await page.content();
  console.log('--- HTML DUMP START ---');
  console.log(bodyHtml);
  console.log('--- HTML DUMP END ---');
});

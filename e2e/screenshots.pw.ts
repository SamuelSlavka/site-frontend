import { test } from '@playwright/test';
import { mockApi } from './mock-api';

const routes: [name: string, path: string][] = [
  ['dashboard', '/dashboard'],
  ['wiki', '/wiki'],
  ['article', '/wiki/s1;title=Home%20server%20setup;isPubliclyEditable=false'],
  ['privacy', '/privacy'],
  ['not-found', '/does-not-exist'],
  ['access-denied', '/access-denied'],
];

for (const [name, path] of routes) {
  test(name, async ({ page }, info) => {
    await mockApi(page);
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // chart and fade-in animations
    await page.screenshot({ path: `e2e/__screenshots__/${name}-${info.project.name}.png`, fullPage: true });
  });
}

test('wiki-login-modal', async ({ page }, info) => {
  await mockApi(page);
  await page.goto('/wiki');
  await page.getByRole('button', { name: 'New article' }).click();
  await page.getByRole('dialog').waitFor();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `e2e/__screenshots__/wiki-login-modal-${info.project.name}.png` });
});

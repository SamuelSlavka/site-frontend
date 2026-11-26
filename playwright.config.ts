import { defineConfig } from '@playwright/test';

/** Visual snapshots of every route with a mocked backend. Run with `yarn screenshots`. */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.pw.ts',
  outputDir: './e2e/.results',
  fullyParallel: true,
  reporter: 'line',
  use: {
    baseURL: 'http://localhost:4300',
    colorScheme: 'dark',
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'npx ng serve --port 4300',
    url: 'http://localhost:4300',
    reuseExistingServer: true,
    timeout: 180_000,
  },
});

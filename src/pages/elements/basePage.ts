import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async safeClick(locator: Locator) {
   await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async safeFill(locator: Locator, value: any) {
    await locator.fill(value);
  }

  async waitForLoaderToDisappear(loader: Locator) {
    await loader.waitFor({ state: 'hidden' });
  }

  async verifyUrl(partialUrl: string) {
    await expect(this.page).toHaveURL(new RegExp(partialUrl));
  }

  async clickAndWaitForResponse(locator: Locator, status: number) {
    const [response] = await Promise.all([
      this.page.waitForResponse(r => r.status() === status),
      locator.click()
    ]); 
    return response;
  }

  async navigateViaMenu(...menuPath: string[]) {
  for (const item of menuPath) {
    await this.page.getByRole('link', { name: item }).click();
  }
}
}

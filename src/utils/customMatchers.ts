import { expect } from '@playwright/test';
import { Locator } from '@playwright/test';

export class Matcher{

 static async toBeLoadedImage(locator: any) {
  const width = await locator.evaluate(
    (img: HTMLImageElement) => img.naturalWidth
  );

  expect(width).toBeGreaterThan(0);
}

static toHaveStatus(response: any, expected: number) {
  expect(response.status()).toBe(expected);
}

static validateText(actual:string, expected:string){
  expect(actual.trim()).toBe(expected);
}

static validateNotEqual(actual:string, wrong:string){
  expect(actual.trim()).not.toBe(wrong);

}

static validateVisible(locator:Locator){
  expect(locator).toBeVisible();
}

static validateNotVisible(locator:Locator){
  expect(locator).not.toBeVisible();
}
}


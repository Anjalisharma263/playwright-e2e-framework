import {test,expect} from '../src/fixtures/baseTest'
import { brokenImagesLinksPage } from "../src/pages/brokenImagesLinksPage";

test.describe('Links page E2E', () => {
  let validLinkStatus = 200;
  let invalidLinkStatus =500;
  let expectedURL='https://demoqa.com/';
  let expectedStatus = 200;
  let expectedInvalidStatus = 500;


test('validate images',async({brokenPage})=>{
 const naturalWidthVal = await brokenPage.validateImage(brokenPage.validImage);
  expect(naturalWidthVal).toBeGreaterThan(0);
 const naturalWidthVal1 = await brokenPage.validateImage(brokenPage.invalidImage);
  expect(naturalWidthVal1).toBe(0);
});

test('validate validlinks', async({brokenPage})=>{
 const response = await brokenPage.validatelinks(brokenPage.validLink,expectedStatus);
  expect(response.status()).toBe(expectedStatus)
});

test('validate invalidlinks', async({brokenPage})=>{
const invalidResponse = await brokenPage.validatelinks(brokenPage.brokenLink,expectedInvalidStatus);
expect(invalidResponse.status()).toBe(expectedInvalidStatus)});

});
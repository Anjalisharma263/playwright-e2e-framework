// @ts-check
import { test, expect } from '../tests/Fixtures/testData';
import { TextboxPage } from '../src/pages/textboxPage';

test('test form fill textbox successfully', async({page,textBoxAddData})=>{
  const textBox = new TextboxPage(page);
  await textBox.navigate();
  await textBox.fillformData(textBoxAddData);
  await textBox.submit();
  await textBox.assertResult(textBoxAddData);
});

test('should show validation error for invalid email', async({page})=>{
const textbox = new TextboxPage(page);
  await textbox.navigate();
  await page.getByRole('textbox',{name:'Full Name'}).fill("Anjali");
  await page.getByPlaceholder('name@example.com').fill("anjali@gmail.comt");
  await textbox.submit();
  await expect(page.getByPlaceholder('name@example.com')).toHaveCSS('border-color','rgb(255, 0, 0)');
});

test('should not submit when form is empty',async({page})=>{
const textbox = new TextboxPage(page);
await textbox.navigate();
await textbox.submit();
await expect(page.locator('#output')).toBeHidden();
});

test('should submit only filled fields',async({page})=>{
const textbox = new TextboxPage(page);
  await textbox.navigate();
  await page.getByRole('textbox',{name:'Full Name'}).fill("Anjali");
  await textbox.submit();
  await expect(page.getByText('Name:Anjali Sharma')).toBeVisible();
  await expect(page.getByText('Email:')).toBeHidden();
});
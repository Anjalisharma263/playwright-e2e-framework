// @ts-check
import { expect, test} from '@playwright/test';
import { TextboxPage } from '../src/pages/textboxPage';

test('test form fill textbox successfully', async({page})=>{
  const textBox = new TextboxPage(page);
  const data={
    fullName: 'Anjali Sharma',
    email: 'anjali@gmail.com',
    currentAddress: 'street 123, xyz',
    permanentAddress: 'street 445, abc',
  }
  await textBox.navigate();
  await textBox.fillformData(data);
  await textBox.submit();
  await textBox.assertResult(data);
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
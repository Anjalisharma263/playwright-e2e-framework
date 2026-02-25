import { logger } from '../src/utils/logger';
import {test,expect} from '../src/fixtures/baseTest';
import { Page } from '@playwright/test';


test('Validate simple alert appears', async({alertPage})=>{
      logger.info("Simple alert test starts");
    await test.step('click on the button for simple alert', async () => {
  await alertPage.acceptAlertDialog(alertPage.clicksimpleAlert);
});

await test.step('validate alert result text', async () => {
  const result = await alertPage.getAlertMessage(alertPage.clicksimpleAlert);
  expect(result).toBe('You clicked a button');
});
});

test('Validate delayed alert appears', async({alertPage})=>{
logger.info("delayed alert test starts");
await test.step('validate delayed alert result text', async () => {
  const result = await alertPage.getAlertMessage(alertPage.clickdelayedAlert);
  expect(result).toBe('This alert appeared after 5 seconds');
});
});

test('Validate confirm box alert appears', async({alertPage})=>{
let textMsg:any;
logger.info("confirm alert test starts");
await test.step('validate confirm box alert result text', async () => {
  const result = await alertPage.getAlertMessage(alertPage.clickconfirmAlert);
  expect(result).toBe('Do you confirm action?');
  textMsg = await alertPage.getSuccessText(alertPage.clickonfirmOKBtn);
  expect(textMsg).toContain('Ok');
});

await test.step('validate cancel text', async()=>{
await alertPage.handleAlertDismiss(alertPage.clickconfirmAlert);
  textMsg = await alertPage.getSuccessText(alertPage.clickonfirmOKBtn);
  expect(textMsg).toContain('Cancel');
});
});

test('Validate entered text shown', async({alertPage})=>{
let name:string;
name="anjali";
logger.info("Prompt Alert test starts");
await test.step('Enter text in prompt', async () => {
  await alertPage.handlePromptAlert(alertPage.clickpromptAlert,name);
  const textMsg =await alertPage.getSuccessText(alertPage.enteredName)
  expect(textMsg).toContain(name);
});
});

test.describe('Prompt Negative Scenarios', () => {

  const testData = [
    { input: '' },
    { input: '   ' },
    { input: '@@@###' },
    { input: '123456' },
    { input: 'verylongnamethatisunexpected' }
  ];

  for (const data of testData) {
    test(`Validate prompt with input: "${data.input}"`, async ({ alertPage }) => {

      await alertPage.handlePromptAlert(
        alertPage.clickpromptAlert,
        data.input
      );

      const text = await alertPage.getSuccessText(alertPage.enteredName);
       expect(text).toContain(data.input.trim() || '');
    });
  }
});


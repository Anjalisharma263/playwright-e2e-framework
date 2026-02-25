import { Page } from '@playwright/test';
import {test,expect} from '../src/fixtures/baseTest';
import { logger } from '../src/utils/logger';
const expectedNewTabURL = "https://demoqa.com/sample";

test.describe.parallel('New tab test',()=>{
test('@tab Validate the opening of new tab', async ({ browserWindowPage }) => {
   logger.info('New tab feature test starts');
   await test.step('Click on the new tab button', async () => {
  const newTab =  await browserWindowPage.openTab(browserWindowPage.newTabBtn);
  logger.info('New tab opened successfully');
    await expect.soft(newTab).toHaveURL(expectedNewTabURL);
});
});
});
test.describe.parallel('New Window test',()=>{
test('@window Validate the opening of a new window', async({browserWindowPage})=>{
let newWindow:any;
await test.step('Open a new window', async()=>{
newWindow= await browserWindowPage.openTab(browserWindowPage.newWindowBtn);
logger.info('New window opened successfully');
});


await test.step('Validate heading of the window', async()=>{
const heading = await browserWindowPage.getHeadingFromPage(newWindow)
await expect.soft(heading).toBe('This is a sample page');
await browserWindowPage.closeChildWindow(newWindow);
});
});
test('@smoke Get message from new Window', async({browserWindowPage})=>{
  let newWindow:any;
  await test.step('Open a new window and get the message', async()=>{
  newWindow= await browserWindowPage.openTab(browserWindowPage.newWindowMsgBtn);
logger.info('New window opened successfully');
});

await test.step('Validating message', async()=>{
const bodyText = await newWindow.locator('body').textContent();
 expect.soft(bodyText).toContain("Knowledge increases ");
 expect.soft(bodyText?.length).toBeGreaterThan(10);
await browserWindowPage.closeChildWindow(newWindow);
});
});

test('@smoke validate multiple tabs opening',async({browserWindowPage})=>{
  const openedPages:Page[]=[];
 await test.step('open window multiple times', async()=>{
 let page;
 for(let i=0;i<3;i++){
  page= await browserWindowPage.openTab(browserWindowPage.newWindowBtn);
 openedPages.push(page);
 }
 });

 await test.step('validate multiple pages', async()=>{
    expect(openedPages.length).toBe(3)
  for(const page of openedPages){
 await expect.soft(page).toHaveURL(expectedNewTabURL);
 await page.close();
  }
});
});
});

import {test as base} from '@playwright/test';
import { brokenImagesLinksPage } from '../pages/elements/brokenImagesLinksPage';
import { FormPage } from '../pages/practiseFormPage';
import path from 'node:path';
import { logger } from '../utils/logger';
import '../utils/customMatchers';
import { BrowserWindowPage } from '../pages/browserWindowsPage';
import { AlertTest } from '../pages/alertPage';
import { IFramePage } from '../pages/iframePage';
import { NestedFramePage } from '../pages/nestedFramesPage';


type myfixtures={
    brokenPage:brokenImagesLinksPage
    practiseForm: FormPage
    uploadFile:{
        fileName:string;
        filePath:string;
    }
    browserWindowPage: BrowserWindowPage
    alertPage: AlertTest
    iframePage:IFramePage
    nestedFramePage:NestedFramePage
};

export const test = base.extend<myfixtures>({
    brokenPage: async({page},use)=>{
        const brokenObj= new brokenImagesLinksPage(page);
         await brokenObj.navigate();
          await use(brokenObj);
    },
    practiseForm:async({page},use)=>{
        const formObj= new FormPage(page);
        await formObj.navigate();
        await use(formObj);
    },
    uploadFile: async({page},use)=>{
         await use({
    fileName: 'scenicpicture.jpg',
    filePath: path.join(process.cwd(),'tests','data','scenicpicture.jpg')
    })
},
 browserWindowPage: async({page},use)=>{
    const browserWindowPageObj = new BrowserWindowPage(page);
    await browserWindowPageObj.navigate();
    await use(browserWindowPageObj);

 },
 alertPage: async({page},use)=>{
    const alertPageObj = new AlertTest(page);
    await alertPageObj.navigate();
    await use(alertPageObj);

 },
 iframePage :async({page},use)=>{
    const iframePageObj = new IFramePage(page);
    await iframePageObj.navigate();
    await use(iframePageObj);
 },
 nestedFramePage:async({page},use)=>{
    const nestedFrameObj= new NestedFramePage(page);
    await nestedFrameObj.navigate();
    await use(nestedFrameObj);
 }


});
test.beforeEach(async({},testInfo)=>{
    logger.info( `Starting, ${testInfo.title}`);
});

test.afterEach(async({page},testInfo)=>{
    const context = page.context();
    const pages1 = context.pages();
    console.log(`finsihed,${testInfo.title} -Status: ${testInfo.status}`);
    logger.info('Logger working');
    if(testInfo.status!=='passed'){
        for(const page of pages1){
    const screeshot = await page.screenshot({fullPage:true});
        await testInfo.attach('Failure screenshot',{
            body:screeshot,
            contentType: 'image/png'
        });
        }
    
    if(testInfo.retry){
        console.log(`Retry attempt: ${testInfo.retry}`);
    }
    }
    else{
        logger.error('Test Passed');
    }
    const pages = page.context().pages();
    for(let i =1;i<pages.length;i++){
        await pages[i].close();
    }

});

export {expect} from '@playwright/test';
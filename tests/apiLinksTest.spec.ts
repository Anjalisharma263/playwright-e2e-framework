import {test,expect} from '@playwright/test';
import {apiLinksPage} from '../src/pages/apiLinksPage';

test.describe('api links testing E2E',()=>{
    let apilinkObj:apiLinksPage;
    test.beforeEach(async({page})=>{
    apilinkObj= new apiLinksPage(page);
    await apilinkObj.navigate();
    });
    
    test('validate new tab opening',async({page})=>{
        const newPage = await apilinkObj.openNewTab(apilinkObj.homeLink);
        await expect(newPage).toHaveURL(apilinkObj.newPageExpectedURL);
        await expect(apilinkObj.newPageExpectedImage).toBeVisible();
    });

    test('validate api links opening',async({page})=>{
            const apiData=[
    { name: 'created', status: 201, text: 'Created' },
    { name: 'noContent', status: 204, text: 'No Content' },
    { name: 'moved', status: 301, text: 'Moved Permanently' },
    { name: 'badRequest', status: 400, text: 'Bad Request' },
    { name: 'unauthorized', status: 401, text: 'Unauthorized' },
    { name: 'forbidden', status: 403, text: 'Forbidden' },
    { name: 'notFound', status: 404, text: 'Not Found' }
            ];
        for(const link of apiData){
       const responseObj= await apilinkObj.clickOnAPILinks(apilinkObj.apilinks[link.name],link.status);
       expect(responseObj.status()).toBe(link.status);
       await expect(apilinkObj.responseText).toContainText(link.text);
            }
      });
    });
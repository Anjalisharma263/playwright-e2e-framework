import {test} from '@playwright/test';
import {dynamicPropertiesTest} from '../src/pages/dynamicPropertiesPage';
import { expect } from '@playwright/test';

test.describe('test dynamic properties E2E',()=>{
    let dynamicPropertiesTestObj: dynamicPropertiesTest;
    test.beforeEach(async({page})=>{
        dynamicPropertiesTestObj = new dynamicPropertiesTest(page);
        await dynamicPropertiesTestObj.navigate();
    });

    test('validate dynamic property of enable after 5 seconds', async({page})=>{
     await expect(dynamicPropertiesTestObj.enableAfter5Sec).toBeEnabled();
     await expect(dynamicPropertiesTestObj.colorChange).toHaveCSS('color','rgb(220, 53, 69)');
     await expect(dynamicPropertiesTestObj.visibleAfter5Sec).toBeVisible();
    
    });

})
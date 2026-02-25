import { logger } from '../src/utils/logger';
import {test,expect} from '../src/fixtures/baseTest';
import { Page } from '@playwright/test';
import { IFramePage } from '../src/pages/iframePage';
import iframeData from '../tests/data/iframeData.json';

test.describe('iFrame UI Validation',async()=>{
test('@iframe Validate parent and iframe headings', async({iframePage})=>{

    await test.step('Validate parent heading', async () => {
        const parentText = await iframePage.getParentHeadingText();
        expect(parentText).toBe(iframeData.expectedParentHeading);
    });
    
       await test.step('Validate Frame1 heading', async () => {
        const frame1Text = await iframePage.getFrame1Heading();
        expect(frame1Text).toBe(iframeData.expectedFrameHeading);
    });
       await test.step('Validate Frame2 heading', async () => {
        const frame2Text = await iframePage.getFrame2Heading();
        expect(frame2Text).toBe(iframeData.expectedFrameHeading);
    });
})
});
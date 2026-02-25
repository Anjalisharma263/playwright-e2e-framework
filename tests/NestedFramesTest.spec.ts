import {test} from '../src/fixtures/baseTest';
import iframeData from '../tests/data/iframeData.json';
import { Matcher } from '../src/utils/customMatchers';

test.describe.configure({mode:'parallel', retries:0});
test.describe('Nested frames Tests @nested @frames',()=>{
  test('Validate nested frame texts', async({nestedFramePage})=>{
     await test.step('Validate parent document page heading', async () => {
        const title = await nestedFramePage.getPageTitle();
        Matcher.validateText(title, iframeData.expectedNestedFramePageTitle);

      });

           await test.step('Validate parent frame text', async () => {
        const parentText = await nestedFramePage.getParentFrameText();
        Matcher.validateText(parentText, iframeData.expectedNestedFrameParentFrameTitle);
      });

           await test.step('Validate child frame text', async () => {
       const childText = await nestedFramePage.getChildFrameText();
        Matcher.validateText(childText, iframeData.expectedNestedFrameChildFrameTitle);
      });
  });

});
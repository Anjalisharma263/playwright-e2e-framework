import { Page, FrameLocator, Locator } from "@playwright/test";
import { BasePage } from "./elements/basePage";

export class IFramePage extends BasePage{

  readonly parentHeading: Locator;
  readonly frame1: FrameLocator;
  readonly frame2: FrameLocator;
  
    constructor(protected page:Page){
super(page);
this.frame1= this.page.frameLocator('#frame1');
this.frame2 =  this.page.frameLocator('#frame2');
this.parentHeading = page.getByRole('heading', { name: 'Frames',exact:true });


    }
    async navigate() {
  await this.page.goto('https://demoqa.com/frames');
  //await this.navigateViaMenu('Alerts, Frame & Windows', 'Frames');
}

async getParentHeadingText():Promise<string>{
     return await this.parentHeading.textContent() ?? '';
}
 async getFrame1Heading(): Promise<string> {
    return await this.frame1.locator('h1').textContent() ?? '';
  }

  async getFrame2Heading(): Promise<string> {
    return await this.frame2.locator('h1').textContent() ?? '';
  }
    
}


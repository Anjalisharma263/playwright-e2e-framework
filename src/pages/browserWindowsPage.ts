import { Locator, Page } from "@playwright/test";
import { BasePage } from "./elements/basePage";

export class BrowserWindowPage extends BasePage{
    readonly newTabBtn:Locator;
    readonly newWindowBtn:Locator;
    readonly newWindowMsgBtn:Locator;
    constructor(protected page:Page){
        super(page);
     this.newTabBtn =  page.getByRole('button',{name:'New Tab'});
    this.newWindowMsgBtn = page.getByRole('button', { name: 'New Window Message' });
    this.newWindowBtn =  page.getByRole('button', { name: 'New Window' , exact:true});
}
      async navigate() {
  await this.page.goto('https://demoqa.com/');
  await this.navigateViaMenu('Alerts, Frame & Windows', 'Browser Windows');
}
    
  

    async openTab(locator:Locator) : Promise<Page>{
       const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        locator.click()
       ]);
       await newPage.waitForLoadState();
       return newPage;
    }

     async getHeadingFromPage(page:Page):Promise<string>{
     const text= await page.locator("#sampleHeading").textContent();
     return text?? ' ';

     }

     async closeChildWindow(page:Page) {
        await page.close();
     }
}
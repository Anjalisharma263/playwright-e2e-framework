import { Locator, Page } from "@playwright/test";
import { BasePage } from "./elements/basePage";
import { resolve } from "node:dns";

export class AlertTest extends BasePage{
    readonly clicksimpleAlert:Locator;
    readonly clickdelayedAlert:Locator;
    readonly clickconfirmAlert:Locator;
    readonly clickpromptAlert:Locator;
    readonly clickonfirmOKBtn:Locator;
    readonly enteredName: Locator;

    constructor(protected page:Page){
        super(page);
        this.clicksimpleAlert = this.page.locator('#alertButton');
        this.clickdelayedAlert = this.page.locator('#timerAlertButton');
        this.clickconfirmAlert = this.page.locator('#confirmButton');
        this.clickpromptAlert = this.page.locator('#promtButton');
        this.clickonfirmOKBtn = this.page.getByText('You selected');
        this.enteredName = this.page.getByText('You entered');

    }

    async navigate() {
     await this.page.goto('https://demoqa.com/');
    await this.navigateViaMenu('Alerts, Frame & Windows', 'Alerts');
}
 async acceptAlertDialog(locator:Locator){
   this.page.once('dialog', dialog => dialog.accept());
  await locator.click();
 };

 async getAlertMessage(locator:Locator):Promise<string>{
        const dialogPromise =  new Promise<string>((resolve)=>{
            this.page.once('dialog', async(dialog)=>{
              const message= dialog.message();
               await dialog.accept();
               resolve(message);
            });
        });
await locator.click();
return dialogPromise;

}
 async handleAlertDismiss(locator:Locator){
       this.page.once('dialog', async (dialog) => {
       await dialog.dismiss();
    });
       await locator.click();
}
async handlePromptAlert(locator:Locator,name:string):Promise<string>{
        const dialogPromise =  new Promise<string>((resolve)=>{
            this.page.once('dialog', async(dialog)=>{
              const message= dialog.message();
               await dialog.accept(name);
               resolve(message);
            });
        });
await locator.click();
return dialogPromise;
}
    async getSuccessText(locator:Locator): Promise<any>{
    let textAfterClick = locator.textContent();
    return textAfterClick?? ' ';
    }
     

   
}
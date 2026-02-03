import { Page } from "@playwright/test";

export class radioButtonPage{
    constructor(private page:Page){}

    async navigate(){
        await this.page.goto("https://demoqa.com/radio-button");
    }

    async selectRadioButton(label:string){
  await this.page.getByText(label).click();
    }

    async assertResult(text:string){
await this.page.locator('.mt-3').getByText(text);
    }

}
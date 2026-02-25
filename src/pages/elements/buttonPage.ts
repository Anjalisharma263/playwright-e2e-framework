import { expect, Page } from "@playwright/test";
export class buttonPage{
    constructor(private page:Page){}

     async navigate(){
await this.page.goto('https://demoqa.com/buttons');
    }
    
    async clickDoubleClickButton(){
const doubleClickButton = this.page.locator('#doubleClickBtn');
await doubleClickButton.dblclick();
    }

      async clickrightClickButton(){
        const rightClickBtn = this.page.locator('#rightClickBtn');
        await rightClickBtn.click({button:'right'});
    }

      async clickClickButton(){
 await this.page.getByText('Click Me',{exact:true}).click();
    }

    async assertResult(text:string){
        await expect(this.page.getByText(text)).toBeVisible();
    }

}
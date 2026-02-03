import { Page,expect } from "@playwright/test";
export class checkboxPage{
    constructor(private page:Page){}
    async navigate(){
        await this.page.goto("https://demoqa.com/checkbox");
    }
    async expandAll(){
await this.page.getByRole('button',{name:'Expand all'}).click();
    }
    async collapseAll(){
        await this.page.getByRole('button',{name:'Collapse all'}).click();

    }
    
    async selectCheckbox(label:string){
await this.page.locator('.rct-title')
    .getByText(label, { exact: true })
    .check();
    }

    async unselectCheckbox(label:string){
await this.page.locator('.rct-title')
    .getByText(label, { exact: true })
    .check();
    }

    async assertResult(text:string){
        await expect(this.page.locator('#result').getByText(text)).toBeVisible();
    }
    }


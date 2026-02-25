import { FrameLocator, Locator, Page } from "@playwright/test";
import { BasePage } from "./elements/basePage";
import { text } from "node:stream/consumers";


export class NestedFramePage extends BasePage{
    readonly pageTitle:Locator;
    readonly parentFrame:FrameLocator;
    readonly childFrame:FrameLocator;
    constructor(protected page:Page){
        super(page);
        this.pageTitle = page.getByRole('heading',{name:'Nested Frames', exact:true});
        this.parentFrame = page.frameLocator('#frame1');
        this.childFrame = this.parentFrame.frameLocator('iframe');
    }
    async navigate(){
       await this.page.goto('https://demoqa.com/nestedframes');
    }

    async getPageTitle(){
 return await this.pageTitle.textContent() ?? '';
    }

    async getParentFrameText(){
  return await this.parentFrame.getByText("Parent frame").textContent() ?? '';
    }

    async getChildFrameText(){
 return await this.childFrame.getByText("Child Iframe").textContent() ?? '';
    }

    async isParentFrameVisible(){
return  this.parentFrame.getByText("Parent frame");
    }

    async isChildFrameVisible(){
return  this.parentFrame.getByText("Child Iframe");
    }

}
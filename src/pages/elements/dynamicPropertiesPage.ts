import { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class dynamicPropertiesTest{
     readonly enableAfter5Sec:Locator;
     readonly colorChange:Locator;
     readonly visibleAfter5Sec:Locator;
   constructor(private page:Page){
     this.enableAfter5Sec=this.page.locator('#enableAfter');
     this.colorChange = this.page.locator('#colorChange');
     this.visibleAfter5Sec = this.page.locator('#visibleAfter');
}
async navigate(){
   await this.page.goto('https://demoqa.com/dynamic-properties');
}
}
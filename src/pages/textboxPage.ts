import {Page,expect} from '@playwright/test';
export class TextboxPage{
    constructor(private page:Page){}
async navigate(){
    await this.page.goto('https://demoqa.com/text-box');
}
async fillformData(data:{
    fullName:string;
    email:string;
    currentAddress: string;
    permanentAddress:string;
})
{
 await this.page.getByRole('textbox',{name:'Full Name'}).click();
  await this.page.getByRole('textbox',{name:'Full Name'}).fill(data.fullName);
  await this.page.getByPlaceholder('name@example.com').fill(data.email);
  await this.page.getByRole('textbox',{name:'Current Address'}).fill(data.currentAddress);
  await expect(this.page.locator('#close-fixedban')).toBeVisible();
  await this.page.locator('#permanentAddress').fill(data.permanentAddress);
}
async submit(){
await this.page.getByRole('button',{name:'Submit'}).click();

}
async assertResult(data:{
    fullName:String;
    email:String;
    currentAddress: String;
    permanentAddress:String;}){
       // await expect(this.page.locator('#output')).toBeVisible();

  await expect(this.page.getByText(`Name:${data.fullName}`)).toBeVisible();
  await expect(this.page.getByText(`Email:${data.email}`)).toBeVisible();
  await expect(this.page.getByText(`Current Address :${data.currentAddress}`)).toBeVisible();
  await expect(this.page.getByText(`Permananet Address :${data.permanentAddress}`)).toBeVisible();
}
}


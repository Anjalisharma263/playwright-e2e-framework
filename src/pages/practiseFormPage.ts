import { _baseTest, Page } from "@playwright/test";
import { BasePage } from "./elements/basePage";
import { Locator } from "@playwright/test";
    export type FormData = {
  personal: {
    fName: string;
    lastName: string;
    email: string;
    mobile: string;
    dob: string;
  };
  address: {
    city: string;
    state: string;
    currentAddress: string;
  };
  hobbies: string[];
  subjects: string[];
};
export class FormPage extends BasePage{

    readonly firstName:Locator;
    readonly lastName:Locator;
    readonly email:Locator;
    readonly male:Locator;
    readonly mobileNum:Locator;
    readonly dob:Locator;
    readonly subjects:Locator;
    readonly hobbies:Locator;
    readonly upload:Locator;
    readonly currentAddress:Locator;
    readonly stateDropDown:Locator;
    readonly typeState:Locator;
    readonly selectState:Locator
    readonly cityDropDown:Locator;
    readonly typeCity:Locator;
    readonly selectCity:Locator;
    readonly submit:Locator;

    constructor(page:Page){
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email =   page.getByRole('textbox', { name: 'name@example.com' });
        this.mobileNum = page.getByRole('textbox', { name: 'Mobile Number' });
        this.dob = page.locator('#dateOfBirthInput');
        this.male = page.getByRole('radio', { name: 'Male', exact: true });
        this.subjects = page.locator('.subjects-auto-complete__input');
        this.hobbies = page.locator('div').filter({ hasText: /^Sports$/ });
        this.upload = page.locator('#uploadPicture');
        this.currentAddress =  page.getByRole('textbox', { name: 'Current Address' });
        this.stateDropDown = page.locator('#state > .css-13cymwt-control > .css-hlgwow > .css-19bb58m');
        this.typeState =  page.locator('#react-select-3-input');
       this.cityDropDown =  page.locator('div').filter({ hasText: /^Select City$/ }).first();
       this.typeCity = page.locator('#react-select-4-input');
       this.selectCity = page.getByText('Karnal', { exact: true });
       this.submit =  page.getByRole('button', { name: 'Submit' });

    }
    async navigate(){
        await this.page.goto('https://demoqa.com/');
        await this.page.getByRole('link', { name: 'Forms' }).click();
        await this.page.getByRole('listitem').click();
    }


    async fillPersonalInfo(data:FormData["personal"]) {
    await this.safeFill(this.firstName,data.fName);
    await this.safeFill(this.lastName,data.lastName);
    await this.safeFill(this.email,data.email);
    await this.safeFill(this.mobileNum,data.mobile);
    await this.safeFill(this.dob,data.dob);

}
async fillAddress(data:FormData["address"]){

    await this.safeClick(this.stateDropDown);
    await this.typeState.fill(data.state);
    await this.page.locator(`[id^="react-select-3-option"]`, { hasText: data.state }).click();

    await this.safeClick(this.cityDropDown);
    await this.typeCity.fill(data.city);
    await this.page.locator(`[id^="react-select-4-option"]`, { hasText: data.city }).click();
    await this.currentAddress.fill(data.currentAddress);

}

    async selectGender(){
          await this.male.check();
    }

   async uploadFile(filePath:string){
           await this.upload.setInputFiles(filePath);
       }

    async selectHobbies(hobbiesData:string[]){
        for(const hobby of hobbiesData){
        await  this.page.getByText(hobby,{exact:true}).click();
        }
    }

    async selectMultiSubjects(subjects: string[]){
         for(const subject of subjects){
        await this.subjects.fill(subject);
        await this.page.getByText(subject, {exact:true}).click();
    }
}

  async submitDetails(){
    await this.safeClick(this.submit);
  }

  



}
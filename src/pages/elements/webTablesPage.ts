import { expect, Locator, Page } from "@playwright/test";

export class webtable {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://demoqa.com/webtables');
    }

    async clickAddBtn() {
        await this.page.locator('#addNewRecordButton').click();
    }

    async fillformData(data: {
        FirstName: string;
        LastName: string;
        Email: string;
        Age: string;
        Salary: string;
        Department: string;
    }) {
        await this.page.getByPlaceholder('First Name').fill(data.FirstName);
        await this.page.getByPlaceholder('Last Name').fill(data.LastName);
        await this.page.getByPlaceholder('name@example.com').fill(data.Email);
        await this.page.getByPlaceholder('Age').fill(data.Age);
        await this.page.getByPlaceholder('Salary').fill(data.Salary);
        await this.page.getByPlaceholder('Department').fill(data.Department);
    }

    async submitDetails() {
        await this.page.locator('#submit').click();
    }

    async assertRowData(row:Locator,data:any){
     await expect(row.getByRole('gridcell', { name: `${data.FirstName}`})).toBeVisible();
     await expect(row.getByRole('gridcell', { name: `${data.LastName}`})).toBeVisible();
     await expect(row.getByRole('gridcell', { name: `${data.Email}`})).toBeVisible();
     await expect(row.getByRole('gridcell', { name: `${data.Age}`})).toBeVisible();
     await expect(row.getByRole('gridcell', { name: `${data.Salary}`})).toBeVisible();
     await expect(row.getByRole('gridcell', { name: `${data.Department}`})).toBeVisible();
    }    

   getRowByEmail(email: string) {
  return this.page.locator('[role="row"]').filter({
    has: this.page.getByText(email, { exact: true })
  });
}
   async clickEditBtn(email: string){
    const row = this.getRowByEmail(email);
   row.locator('span[title="Edit"]')
    .click();

   }
    async clickDeleteBtn(email:string) {
    const row = this.getRowByEmail(email);
     row.locator('span[title="Delete"]')
    .click();
    }

    async search(searchTerm:string) {
await this.page.getByPlaceholder('Type to search').fill(searchTerm)

}
async clickColumnHeader(text:string){
    await this.page.locator('[role="columnheader"]').getByText(text).click();
}
 
}
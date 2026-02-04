import { Page } from "@playwright/test";

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
        Salary: string
        Department: string
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

  async getRowByEmail(email: string) {
  return this.page.locator('[role="row"]').filter({
    has: this.page.getByText(email, { exact: true })
  });
}

    async search() {

    }
    async updateDetails() {

    }
    async deleteDetails() {

    }
    async sortDetails() {

    }
}
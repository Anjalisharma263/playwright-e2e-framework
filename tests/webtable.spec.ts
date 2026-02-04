import {expect, test} from "@playwright/test";
import { webtable} from "../src/pages/webTablesPage";

test('verify addition of the record',async({page})=>{
 const data={
        FirstName: 'Anjali',
        LastName: 'Sharma',
        Email: 'myemail@gmail.com',
        Age: '26',
        Salary: '24',
        Department: 'IT Department'
 }
const webtableobj = new webtable(page);
await webtableobj.navigate();
await webtableobj.clickAddBtn();
await webtableobj.fillformData(data);
await webtableobj.submitDetails();
const row =await webtableobj.getRowByEmail(data.Email);
await expect(row.getByRole('gridcell', { name: `${data.FirstName}`})).toBeVisible();
await expect(row.getByRole('gridcell', { name: `${data.LastName}`})).toBeVisible();
await expect(row.getByRole('gridcell', { name: `${data.Email}`})).toBeVisible();
await expect(row.getByRole('gridcell', { name: `${data.Age}`})).toBeVisible();
await expect(row.getByRole('gridcell', { name: `${data.Salary}`})).toBeVisible();
await expect(row.getByRole('gridcell', { name: `${data.Department}`})).toBeVisible();
})
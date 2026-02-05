import {expect, test} from "@playwright/test";
import { webtable} from "../src/pages/webTablesPage";
import { only } from "node:test";
import { asyncWrapProviders } from "node:async_hooks";

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
await webtableobj.assertRowData(row,data);
})

test('verify editing an existing record',async({page})=>{
    const data = {
        FirstName: 'Anjaliupdated',
        LastName: 'Sharmaupdated',
        Email: 'myemailupdated@gmail.com',
        Age: '22',
        Salary: '25',
        Department: 'IT DepartmentUpdated'
    }
    const webtableobj = new webtable(page);
    await webtableobj.navigate();
    await webtableobj.clickEditBtn('cierra@example.com');
    await webtableobj.fillformData(data);
    await webtableobj.submitDetails();
    const row =await webtableobj.getRowByEmail(data.Email);
    await webtableobj.assertRowData(row,data);
})

test('verify deletion of the record', async({page})=>{
 const webtableobj = new webtable(page);
  await webtableobj.navigate();
  await webtableobj.clickDeleteBtn('cierra@example.com');

  const row = webtableobj.getRowByEmail('cierra@example.com');
  await expect(row).toHaveCount(0);

   
})
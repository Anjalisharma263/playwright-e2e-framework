import {expect, test} from "../tests/Fixtures/testData.ts";
import { webtable} from "../src/pages/webTablesPage";
import { only } from "node:test";
import { asyncWrapProviders } from "node:async_hooks";

test('verify addition of the record',async({page,webTableAddData})=>{
const webtableobj = new webtable(page);
await webtableobj.navigate();
await webtableobj.clickAddBtn();
await webtableobj.fillformData(webTableAddData);
await webtableobj.submitDetails();
const row =await webtableobj.getRowByEmail(webTableAddData.Email);
await webtableobj.assertRowData(row,webTableAddData);
})

test('verify editing an existing record',async({page,webTableUpdateData})=>{
    const webtableobj = new webtable(page);
    await webtableobj.navigate();
    await webtableobj.clickEditBtn('cierra@example.com');
    await webtableobj.fillformData(webTableUpdateData);
    await webtableobj.submitDetails();
    const row =await webtableobj.getRowByEmail(webTableUpdateData.Email);
    await webtableobj.assertRowData(row,webTableUpdateData);
})

test('verify deletion of the record', async({page})=>{
 const webtableobj = new webtable(page);
  await webtableobj.navigate();
  await webtableobj.clickDeleteBtn('cierra@example.com');
  const row = webtableobj.getRowByEmail('cierra@example.com');
  await expect(row).toHaveCount(0);
})

test('verify search with valid input', async({page})=>{
 const webtableobj = new webtable(page);
const searchText =['ci','ve','39','cier','10','in']
await webtableobj.navigate();
for(const term of searchText){
await webtableobj.search(term);
const row = webtableobj.getRowByEmail('cierra@example.com');
await expect(row).toHaveCount(1);
}
});

test('verify search with invalid input', async ({ page }) => {
  const webtableobj = new webtable(page);

  await webtableobj.navigate();
  await webtableobj.search('asdf');
await expect(
  webtableobj.getRowByEmail('cierra@example.com')
).toHaveCount(0);
});


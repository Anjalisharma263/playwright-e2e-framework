import {test} from '@playwright/test';
import { buttonPage } from '../src/pages/buttonPage';

test('verify double click',async({page})=>{
const buttonPageObj = new buttonPage(page);
await buttonPageObj.navigate();
await buttonPageObj.clickDoubleClickButton();
await buttonPageObj.assertResult('You have done a double click')
})

test('verify right click',async({page})=>{
 const buttonPageObj = new buttonPage(page);
await buttonPageObj.navigate();
await buttonPageObj.clickrightClickButton();
await buttonPageObj.assertResult('You have done a right click');
})

test('verify click',async({page})=>{
const buttonPageObj = new buttonPage(page);
await buttonPageObj.navigate();
await buttonPageObj.clickClickButton();
await buttonPageObj.assertResult('You have done a dynamic click');
})
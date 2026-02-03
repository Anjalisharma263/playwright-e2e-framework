import {test, expect} from '@playwright/test';
import { radioButtonPage } from '../src/pages/radioButtonPage';
test('verify if radio button is selected', async({page})=>{
    const radiobtn = new radioButtonPage(page);
    await radiobtn.navigate();
    await radiobtn.selectRadioButton('Yes');
    await radiobtn.assertResult('Yes');
    await expect(page.locator('#yesRadio')).toBeChecked();
    await expect (page.locator('.text-success').getByText('Yes')).toBeVisible();

    await expect(page.getByText('Impressive')).not.toBeChecked();
});
test('test default state',async({page})=>{
    const radiobtn = new radioButtonPage(page);
    await radiobtn.navigate();
    await expect(page.locator('#yesRadio')).not.toBeChecked();
    await expect(page.locator('#impressiveRadio')).not.toBeChecked();
    await expect(page.locator('#noRadio')).toBeDisabled();
});

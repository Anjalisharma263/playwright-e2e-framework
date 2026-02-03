import {test,expect} from '@playwright/test';
import { checkboxPage } from '../src/pages/checkboxPage';
import { only } from 'node:test';

test('select desktop checkboxes', async({page})=>{
const checkbox = new checkboxPage(page);
await checkbox.navigate();
await checkbox.expandAll();
await checkbox.selectCheckbox('Desktop');
await checkbox.selectCheckbox('Notes');
await checkbox.selectCheckbox('Commands');
await checkbox.assertResult('desktop');
await checkbox.assertResult('notes');
await checkbox.assertResult('commands');
});

test('selecting parent select all children', async({page})=>{
const checkbox = new checkboxPage(page);
await checkbox.navigate();
await checkbox.expandAll();
await checkbox.selectCheckbox('Desktop');
await checkbox.assertResult('desktop');
await checkbox.assertResult('notes');
await checkbox.assertResult('commands');
});

test('unselect checkbox', async({page})=>{
    const checkbox = new checkboxPage(page);
    await checkbox.navigate();
    await checkbox.expandAll();
    await checkbox.selectCheckbox('Desktop');
    await checkbox.unselectCheckbox('Desktop');
});

/*test('no checkbox selected', async({page})=>{
    const checkbox = new checkboxPage(page);
    await checkbox.navigate();
    await expect(page.getByText('You have selected')).toBeHidden();
});*/
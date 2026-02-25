import * as dotenv from 'dotenv';
dotenv.config({path: `.env.${process.env.TEST_ENV}`});//load vriable .env file se process.env file mein
import { defineConfig, devices } from '@playwright/test';//Imports Playwright configuration helpers and built-in device presets.
import { off } from 'node:cluster';
//import kro dotenv env variables ko load krne k liye



export default defineConfig({ //export playwright object

  testDir: './tests',//Specifies where your test files are located.

  timeout: 30 * 1000,//Sets maximum time per test (30 seconds).

  expect: {
    timeout: 5000,},//assertions ka max timeout


  retries: process.env.CI ? 2 : 2,//CI mein max 2 retry aur local 0

  workers: process.env.CI ? 2 : 4,//paralled execution CI mein 2 aur local undefined
 fullyParallel: true,
  reporter: [ //report type html aur console
    ['html'],
    ['list']
  ],

  use: {
    baseURL: process.env.BASE_URL, //set base url for all test

    headless: process.env.CI ? true : false, //CI mein headless aur local mein headed

    screenshot: 'only-on-failure', //sirf failure pe screenshot 
    video: process.env.CI ?'retain-on-failure':'off',
    trace: process.env.CI ?'on-first-retry':'off', //sirf first retry pe trace  

    actionTimeout: 0,//no global timeout for actions
    navigationTimeout: 30 * 1000, //max timeout for navigation

  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }/*,
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});

const base = require('@playwright/test');
const dotenv = require('dotenv');
const LoginPage = require('../pages/LoginPage');
const PIMPage = require('../pages/PIMPage');
const AddEmployeePage = require('../pages/AddEmployeePage');
const LogoutPage = require('../pages/LogoutPage');

dotenv.config();

const orangeHrmUrl = process.env.ORANGEHRM_URL;

if (!orangeHrmUrl) {
    throw new Error('ORANGEHRM_URL is not configured in .env');
}

const test = base.test.extend({
    orangeHrmPage: async ({ page }, use) => {
        await page.goto(orangeHrmUrl);
        await use(page);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page, orangeHrmUrl);
        await loginPage.loadLoginPage();
        await use(loginPage);
    },
    pimPage: async ({ page }, use) => {
        const pimPage = new PIMPage(page);
        await use(pimPage);

    },
    addEmployeePage: async ({ page }, use) => {
        const addEmployeePage = new AddEmployeePage(page);
        await use(addEmployeePage);
    },
    logoutPage: async ({ page }, use) => {
        const logoutPage = new LogoutPage(page);
        await use(logoutPage);
    }
});

module.exports = { test, expect: base.expect };
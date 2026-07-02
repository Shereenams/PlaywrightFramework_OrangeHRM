const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const LoginData = require('../data/LoginData');
const ReportUtil =require('../utils/reportsUtil')

let loginPage;

test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page, LoginData.baseURL);
        await loginPage.loadLoginPage();
})
test.afterEach(async ({page})=>{
    page.close();
})


test.describe('Login Functionality @Tests', () => {
    test('Login with valid credentials', async ({ page, baseURL},testInfo) => {

        await ReportUtil.logStepWithScreenshot(page,testInfo,"Login Page ", async ()=>{
            await loginPage.enterUsername(LoginData.Username);
            await loginPage.enterPassword(LoginData.Password);
        })
        await ReportUtil.logStepWithScreenshot(page,testInfo,"Dashboard Page ", async ()=>{
            await loginPage.clickLoginButton();
            await expect(loginPage.verifyLoginSuccess()).toBeTruthy();
        })

    });

    test('Login with Empty credentials', async ({ page, baseURL }, testInfo) => {

        await ReportUtil.logStepWithScreenshot(page,testInfo,"Login Page with Invalid Cred ", async ()=>{
            await loginPage.enterUsername(LoginData.EmptyUsername);
            await loginPage.enterPassword(LoginData.EmptyPassword);
        })
        await ReportUtil.logStepWithScreenshot(page,testInfo,"Error message for Invalid cred ", async ()=>{
            await loginPage.clickLoginButtonEmpty();
            await expect(loginPage.verifyLoginFailure()).toBeTruthy();
        })

    });
});
const { test, expect } = require('../fixtures/orangeHrmFixture');
const LoginData = require('../data/LoginData');
const ReportUtil =require('../utils/reportsUtil')

test.describe('Login Functionality @Tests', () => {
    test('Login with valid credentials', async ({ page, loginPage },testInfo) => {

        await ReportUtil.logStepWithScreenshot(page,testInfo,"Login Page ", async ()=>{
            await loginPage.enterUsername(LoginData.Username);
            await loginPage.enterPassword(LoginData.Password);
        })
        await ReportUtil.logStepWithScreenshot(page,testInfo,"Dashboard Page ", async ()=>{
            await loginPage.clickLoginButton();
            await expect(loginPage.verifyLoginSuccess()).toBeTruthy();
        })

    });
        test('Login with invalid credentials', async ({ page, loginPage }, testInfo) => {

        await ReportUtil.logStepWithScreenshot(page,testInfo,"Login Page with Invalid Cred ", async ()=>{
            await loginPage.enterUsername(LoginData.InvalidUsername);
            await loginPage.enterPassword(LoginData.InvalidPassword);
        })
        await ReportUtil.logStepWithScreenshot(page,testInfo,"Error message for Invalid cred ", async ()=>{
            await loginPage.clickInvalidLoginButton();
            await expect(loginPage.verifyLoginFailureInvalid()).toBeTruthy();
        });

    });
    test('Login with Empty credentials', async ({ page, loginPage }, testInfo) => {

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
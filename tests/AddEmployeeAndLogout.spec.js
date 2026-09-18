const { test, expect } = require('../fixtures/orangeHrmFixture');
const LoginData = require('../data/LoginData');
const EmployeeData = require('../data/EmployeeData.json');
const { RandomGenerator } = require('../utils/radomUtil');
const LogoutPage = require('../pages/LogoutPage');

test('Add Employee', async ({ loginPage, pimPage, addEmployeePage }) => {
    const employeeId = RandomGenerator.generateEmployeeId();
    await loginPage.verifyLoginPageUrl();
    await loginPage.verifyUsernameFieldVisible();
    await loginPage.enterUsername(LoginData.Username);
    await loginPage.enterPassword(LoginData.Password);
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginSuccess();
    await pimPage.navigateToPIM();
    await pimPage.verifyPIMPage(new RegExp(`${LoginData.PimPage}$`));
    await pimPage.clickAddEmployee();
    await addEmployeePage.enterFirstName(EmployeeData.employee.firstName);
    await addEmployeePage.enterMiddleName(EmployeeData.employee.middleName);
    await addEmployeePage.enterLastName(EmployeeData.employee.lastName);
    await addEmployeePage.enterEmployeeId(employeeId);
    await addEmployeePage.clickSave();
    await addEmployeePage.verifyEmployeeCreated();
    
});
test('Logout', async ({ loginPage, logoutPage }) => {
    await loginPage.verifyLoginPageUrl();
    await loginPage.verifyUsernameFieldVisible();
    await loginPage.enterUsername(LoginData.Username);
    await loginPage.enterPassword(LoginData.Password);
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginSuccess();
    await logoutPage.logout();
    await logoutPage.verifyLogout();
    await logoutPage.verifySessionInvalidated();
});
// LoginPage.js
const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page, baseURL) {
        super(page);

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.headline = page.locator('h6:has-Text("Dashboard")');
        this.baseURL = baseURL;
        //this.baseurl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
        this.emptyMessage = page.getByText('Required').first();
        this.invalidMessage = page.getByText('Invalid credentials').first();
    }

    async loadLoginPage() {
        await this.page.goto('/web/index.php/auth/login');
    }

    async verifyLoginPageUrl() {
        await expect(this.page).toHaveURL(/\/web\/index\.php\/auth\/login/);
    }

    async verifyUsernameFieldVisible() {
        await expect(this.usernameInput).toBeVisible();
    }

    async enterUsername(username) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.headline).toBeVisible();//|| await expect(this.emptyMessage).toBeVisible());


    }
     async clickInvalidLoginButton() {
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
     }
    async clickLoginButtonEmpty() {
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.emptyMessage).toBeVisible();


    }

    async verifyLoginSuccess() {
        //await this.page.waitForLoadState('networkidle');
        await expect(this.headline).toBeVisible();

    }
    async verifyLoginFailure() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.emptyMessage).toBeVisible();
    }
    async verifyLoginFailureInvalid() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.invalidMessage).toBeVisible();
    }
}
module.exports = LoginPage;

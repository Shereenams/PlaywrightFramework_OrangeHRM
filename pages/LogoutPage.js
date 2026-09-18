const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
class LogoutPage extends BasePage {
     constructor(page)
    {

        super(page);

        this.userDropdown = page.locator('.oxd-userdropdown-name');
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    }

    async logout() 
    {

        await this.userDropdown.click();
        await this.logoutButton.click();

    }

    async verifyLogout() 
    {

        await expect(this.page).toHaveURL(/auth\/login/);

    }

    async verifySessionInvalidated() {

        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
        );

        await expect(this.page).toHaveURL(/auth\/login/);

    }
 
}
module.exports = LogoutPage;
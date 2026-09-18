const BasePage = require('./BasePage');

class PIMPage extends BasePage {
	constructor(page) {
		super(page);

        this.pimMenu = page.locator('span.oxd-main-menu-item--name').filter({ hasText: 'PIM' });
        this.addEmployeeButton = page.getByRole('link', { name: 'Add Employee' });
	}
	async navigateToPIM() {
		await this.pimMenu.click();
	}

	async verifyPIMPage(url) {
		await this.verifyUrl(url);
	}
	async clickAddEmployee(){
        await this.addEmployeeButton.click();
    }
}

module.exports = PIMPage;

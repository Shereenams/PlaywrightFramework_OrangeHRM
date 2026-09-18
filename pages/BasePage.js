const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async verifyUrl(urlPattern) {
        await expect(this.page).toHaveURL(urlPattern);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = BasePage;
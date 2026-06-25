const { test, testInfo } = require('@playwright/test');

class ReportUtil {
    static async logStep(stepName, action) {
        await test.info(stepName, async () => {
            await action();
        });
    }
    static async logStepWithScreenshot(page,testInfo, stepName, action) {
        await test.step(stepName, async () => {
            await action();
            await page.screenshot({ path: 'screenshot.png' });

        // Attach screenshot to Allure
        await testInfo.attach('screenshot', {
            path: 'screenshot.png',
            contentType: 'image/png',
        });
        })
        

    }
}
module.exports = ReportUtil;
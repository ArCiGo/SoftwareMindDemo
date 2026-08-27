import { Page } from '@playwright/test';

export class Toasts {
    constructor(public readonly page: Page) { }

    async getSuccessToastMessage(timeout = 5000) {
        const successToast = this.page.locator('#toast-container .toast.success');
        await successToast.waitFor({ state: 'visible', timeout });
        return await successToast.locator('.toast-message').textContent();
    }

    async waitForSuccessToastGone(timeout = 10000) {
        const successToast = this.page.locator('#toast-container .toast.success');
        if (await successToast.isVisible()) {
            await successToast.waitFor({ state: 'hidden', timeout });
        }
    }
}

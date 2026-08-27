import { Page } from '@playwright/test';

export class Toasts {
    // Constructor
    constructor(public readonly page: Page) { }

    // Actions
    async isSuccessToastVisible() {
        try {
            await this.page.locator('#toast-container .toast.success')
                .waitFor({ state: 'visible', timeout: 5000 });

            return true;
        } catch {
            return false;
        }
    }

    async getSuccessToastMessage(timeout = 5000) {
        // await this.page
        //     .locator('#toast-container .toast.success')
        //     .waitFor({ state: 'visible', timeout });

        // return await this.page.locator('#toast-container .toast-message').textContent();
        const successToast = this.page.locator('#toast-container .toast.success');
        await successToast.waitFor({ state: 'visible', timeout });
        return await successToast.locator('.toast-message').textContent();
    }

    // Wait until any success toast is hidden (or not present)
    async waitForSuccessToastGone(timeout = 5000) {
        await this.page
            .locator('#toast-container .toast.success')
            .waitFor({ state: 'hidden', timeout })
            .catch(() => { });
    }
}
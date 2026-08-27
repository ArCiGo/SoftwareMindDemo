import { Page } from '@playwright/test';

export class Toasts {
    constructor(public readonly page: Page) { }

    get toastContainer() {
        return this.page.locator('#toast-container');
    }

    get successToast() {
        return this.toastContainer.locator('.toast.success');
    }

    get successToastMessage() {
        return this.successToast.locator('.toast-message');
    }

    async getSuccessToastMessage(timeout = 5000) {
        // const successToast = this.page.locator('#toast-container .toast.success');
        // await successToast.waitFor({ state: 'visible', timeout }); 
        // return await successToast.locator('.toast-message').textContent();

        await this.successToast.waitFor({ state: 'visible', timeout });
        return await this.successToastMessage.textContent();
    }

    async waitForSuccessToastGone(timeout = 10000) {
        // const successToast = this.page.locator('#toast-container .toast.success');
        // if (await successToast.isVisible()) {
        //     await successToast.waitFor({ state: 'hidden', timeout });
        // }
        
        if (await this.successToast.isVisible()) {
            await this.successToast.waitFor({ state: 'hidden', timeout });
        }
    }

    async dismissSuccessToastIfVisible(timeout = 10000): Promise<void> {
        await this.waitForSuccessToastGone(timeout);
    }
}

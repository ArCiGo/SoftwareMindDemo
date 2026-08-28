import { expect, Page } from '@playwright/test';

export class Toasts {
    constructor(public readonly page: Page) { }

    get toastContainer() {
        return this.page.locator('#toast-container');
    }

    get successToast() {
        return this.toastContainer.locator('.toast.success');
    }

    get successToastMessage() {
        return this.successToast.last().locator('.toast-message');
    }

    async waitForSuccessToastGone(timeout = 10000) {
        await expect(this.successToast).toHaveCount(0, { timeout });
    }
}

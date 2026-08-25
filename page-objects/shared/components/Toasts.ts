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

    async getSuccessToastMessage() {
        return await this.page.locator('#toast-container .toast-message').textContent();
    }
}
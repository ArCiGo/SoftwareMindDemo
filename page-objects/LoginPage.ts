import { Page } from '@playwright/test';
import { Toasts } from './shared/components/Toasts';

export class LoginPage {
    private readonly _toasts: Toasts;

    constructor(public readonly page: Page) {
        this._toasts = new Toasts(page);
    }

    get loginTitle() {
        return this.page.locator('.login-title');
    }

    get invalidCredentialsAlert() {
        return this.page.locator('#login-alert');
    }

    get usernameError() {
        return this.page.locator('#username-error');
    }

    get passwordError() {
        return this.page.locator('#password-error');
    }

    async goTo() {
        await this.page.goto('/login.html');
    }

    async loginForm(username: string, password: string, rememberMe: boolean = false) {
        await this.page.locator('#username').clear();
        await this.page.locator('#username').fill(username);

        await this.page.locator('#password').clear();
        await this.page.locator('#password').fill(password);

        if (rememberMe) {
            await this.page.locator('#remember-me').check();
        }
    }

    async clickOnSignInButton() {
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }

    async clickOnRegisterHereLink() {
        await this.page.getByRole('link', { name: 'Register here' }).click();
    }

    async getSuccessToastMessage() {
        return await this._toasts.getSuccessToastMessage();
    }
}

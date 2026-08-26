import { Page } from '@playwright/test';
import { Toasts } from './shared/components/Toasts';

export class LoginPage {
    // Objects, variables and constants
    private readonly _toasts: Toasts;

    // Constructor
    constructor(public readonly page: Page) {
        this._toasts = new Toasts(page);
    }

    // Actions
    async goTo() {
        await this.page.goto('/login.html');
    }

    async headerIsLoaded() {
		return await this.page
			.locator('.login-title')
			.isVisible();
	}

    async loginForm(username: string, password: string, rememberBe: boolean = false) {
        await this.page.locator('#username').clear();
        await this.page.locator('#username').fill(username);
        
        await this.page.locator('#password').clear();
        await this.page.locator('#password').fill(password);

        if(rememberBe)
            await this.page.locator('#remember-me').check();
    }

    async clickOnSignInButton() {
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }

    async errorMessageWhenCredentialsAreInvalid() {
        return await this.page.locator('#login-alert').textContent();
    }

    async errorMessagesWhenFormIsEmpty() {
        const usernameError = await this.page.locator('#username-error').textContent();
        const passwordError = await this.page.locator('#password-error').textContent();

        return {
            usernameError,
            passwordError 
        };
    }

    async clickOnRegisterHereLink() {
        await this.page.getByRole('link', { name: 'Register here' }).click();
    }

    async getSuccessToastMessage() {
        return await this._toasts.getSuccessToastMessage();
    }
}
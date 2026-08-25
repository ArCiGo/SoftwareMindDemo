import { Page } from '@playwright/test';

export class LoginPage {
    // Constructor
    constructor(public readonly page: Page) { }

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
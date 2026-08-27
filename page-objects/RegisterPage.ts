import { Page } from '@playwright/test';
import { IUser } from '../models/IUser';

export class RegisterPage {
    constructor(public readonly page: Page) { }

    get loginTitle() {
        return this.page.locator('.login-title');
    }

    async goTo() {
        await this.page.goto('/register.html');
    }

    async registerForm(user: IUser) {
        await this.page.locator('#reg-username').clear();
        await this.page.locator('#reg-username').fill(user.username);

        await this.page.locator('#reg-email').clear();
        await this.page.locator('#reg-email').fill(user.email);

        await this.page.locator('#reg-password').clear();
        await this.page.locator('#reg-password').fill(user.password);

        await this.page.locator('#reg-confirm-password').clear();
        await this.page.locator('#reg-confirm-password').fill(user.password);

        await this.page.getByRole('button', { name: 'Register' }).click();
    }

    get registerSuccessAlert() {
        return this.page.locator('#register-alert');
    }
}

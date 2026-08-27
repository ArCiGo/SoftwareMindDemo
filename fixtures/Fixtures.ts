import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashboardPage';
import { RegisterPage } from '../page-objects/RegisterPage';
import { env } from '../config/env';

type Fixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    dashboardPage: DashboardPage;
    authenticatedDashboard: DashboardPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    registerPage: async ({ page }, use) => use(new RegisterPage(page)),
    dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
    
    /**
     * Used to authenticate the user and navigate to the dashboard page.
     * It reduced a lot of code duplication and improves the readability of the tests.
     */
    authenticatedDashboard: async ({ page, loginPage, dashboardPage }, use) => {
        await loginPage.goTo();
        await loginPage.loginForm(env.validUsername, env.validPassword, true);
        await loginPage.clickOnSignInButton();
        await expect(page).toHaveURL(/index\.html/);
        await expect(dashboardPage.appTitle).toBeVisible();
        await use(dashboardPage);
    },
});

export { expect } from '@playwright/test';

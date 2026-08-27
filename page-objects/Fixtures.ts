import { test as base } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { RegisterPage } from './RegisterPage';

type Fixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    dashboardPage: DashboardPage;
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    registerPage: async ({ page }, use) => use(new RegisterPage(page)),
    dashboardPage: async ({ page }, use) => use(new DashboardPage(page))
});

export { expect } from '@playwright/test';
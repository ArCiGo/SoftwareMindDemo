import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { DashboardPage } from '../../page-objects/DashboardPage';
import { RegisterPage } from '../../page-objects/RegisterPage';
import { generateUser } from '../../data/dataGenerators';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('Console log:', msg.text()));
});

test.describe('Registration', () => {
    test('The user can register into the platform and log in successfully', async ({ page }) => {
        const newUser = generateUser();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        registerPage = new RegisterPage(page);

        await test.step('STEP 1: Navigate to the Login page and click on \'Register here\' link', async () => {
            await loginPage.goTo();
            await loginPage.clickOnRegisterHereLink();
            
            expect(await registerPage.headerIsLoaded()).toBeTruthy();
        });

        await test.step('STEP 2: Fill the registration form', async () => {
            await registerPage.registerForm(newUser);
        });

        await test.step('STEP 3: The user should be redirected to the Login page and log in with its created credentials', async () => {
            expect(await registerPage.sample()).toContain('Registration successful! Redirecting to login...');

            await expect(async() => {
                await page.waitForURL('**/login.html', { timeout: 5000 });
                expect(await loginPage.headerIsLoaded()).toBeTruthy();
            }).toPass({
                timeout: 3600
            });

            await loginPage.loginForm(newUser.username, newUser.password, true);
            await loginPage.clickOnSignInButton();

            await expect(async() => {
                await page.waitForURL('**/index.html', { timeout: 5000 });
                expect(await dashboardPage.headerIsLoaded()).toBeTruthy();
            }).toPass({
                timeout: 3600
            });
        });
    });
});
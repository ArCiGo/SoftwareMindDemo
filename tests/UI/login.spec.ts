import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { DashboardPage } from '../../page-objects/DashboardPage';
import { SignInMessages } from '../../constants/Messages';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('Console log:', msg.text()));

    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await test.step('STEP 1: Navigate to the Login page', async () => {
        await loginPage.goTo();
    });
});

test.describe('Sign in', () => {
    test('The user can sign in into the platform using valid credentials', async ({ page }) => {
        await test.step('STEP 2: Fill the login form with valid credentials', async () => {
            await loginPage.loginForm(process.env.VALID_USERNAME as string, process.env.VALID_PASSWORD as string, true);
            await loginPage.clickOnSignInButton()

            const toastText = await loginPage.getSuccessToastMessage();
            expect(toastText).toContain(SignInMessages.LOGIN_SUCCESSFUL);
        });

        await test.step('STEP 3: Verify the user is redirected to the Dashboard page', async () => {
            await expect(async () => {
                await page.waitForURL('**/index.html', { timeout: 5000 });
				expect(await dashboardPage.headerIsLoaded()).toBeTruthy();
			}).toPass({
				timeout: 3600
			});
        });
    });

    test('The user can\'t sign in using invalid credentials', async ({ page }) => {
        await test.step('STEP 2: Fill the login form with invalid credentials', async () => {
            await loginPage.loginForm(process.env.INVALID_USERNAME as string, process.env.INVALID_PASSWORD as string, true);
            await loginPage.clickOnSignInButton();
        });

        await test.step('STEP 3: Verify the error message is displayed', async () => {
            expect(await loginPage.errorMessageWhenCredentialsAreInvalid()).toBe(SignInMessages.INVALID_CREDENTIALS);
        });
    });

    test('The user can\'t sign in if he/she lefts the form empty', async ({ page }) => {
        await test.step('STEP 2: Fill the login form with invalid credentials', async () => {
            await loginPage.loginForm('', '', false);
            await loginPage.clickOnSignInButton();

            expect((await loginPage.errorMessagesWhenFormIsEmpty()).usernameError).toBe(SignInMessages.USERNAME_REQUIRED);
            expect((await loginPage.errorMessagesWhenFormIsEmpty()).passwordError).toBe(SignInMessages.PASSWORD_REQUIRED);
        });
    });
});
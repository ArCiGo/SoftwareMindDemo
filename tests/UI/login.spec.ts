import { test, expect } from '../../fixtures/Fixtures';
import { SignInMessages } from '../../constants/Messages';
import { env } from '../../config/env';

test.beforeEach(async ({ loginPage }) => {
    await test.step('STEP 1: Navigate to the Login page', async () => {
        await loginPage.goTo();
    });
});

test.describe('Sign in', () => {
    test('The user can sign in into the platform using valid credentials', async ({ page, loginPage, dashboardPage }) => {
        await test.step('STEP 2: Fill the login form with valid credentials', async () => {
            await loginPage.loginForm(env.validUsername, env.validPassword, true);
            await loginPage.clickOnSignInButton();

            await expect(loginPage.toasts.successToastMessage).toContainText(SignInMessages.LOGIN_SUCCESSFUL);
        });

        await test.step('STEP 3: Verify the user is redirected to the Dashboard page', async () => {
            await expect(page).toHaveURL(/index\.html/);
            await expect(dashboardPage.appTitle).toBeVisible();
        });
    });

    test('The user can\'t sign in using invalid credentials', async ({ loginPage }) => {
        await test.step('STEP 2: Fill the login form with invalid credentials', async () => {
            await loginPage.loginForm(env.invalidUsername, env.invalidPassword, true);
            await loginPage.clickOnSignInButton();
        });

        await test.step('STEP 3: Verify the error message is displayed', async () => {
            await expect(loginPage.invalidCredentialsAlert).toHaveText(SignInMessages.INVALID_CREDENTIALS);
        });
    });

    test('The user can\'t sign in if he/she lefts the form empty', async ({ loginPage }) => {
        await test.step('STEP 2: Attempt to submit the form with empty fields', async () => {
            await loginPage.loginForm('', '', false);
            await loginPage.clickOnSignInButton();

            await expect(loginPage.usernameError).toHaveText(SignInMessages.USERNAME_REQUIRED);
            await expect(loginPage.passwordError).toHaveText(SignInMessages.PASSWORD_REQUIRED);
        });
    });
});

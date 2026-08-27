import {test, expect} from '../../page-objects/Fixtures'
import { SignInMessages } from '../../constants/Messages';

test.beforeEach(async ({ page, loginPage }) => {
    page.on('console', msg => console.log('Console log:', msg.text()));

    await test.step('STEP 1: Navigate to the Login page', async () => {
        await loginPage.goTo();
    });
});

test.describe('Sign in', () => {
    test('The user can sign in into the platform using valid credentials', async ({ page, loginPage, dashboardPage }) => {
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

    test('The user can\'t sign in using invalid credentials', async ({ loginPage }) => {
        await test.step('STEP 2: Fill the login form with invalid credentials', async () => {
            await loginPage.loginForm(process.env.INVALID_USERNAME as string, process.env.INVALID_PASSWORD as string, true);
            await loginPage.clickOnSignInButton();
        });

        await test.step('STEP 3: Verify the error message is displayed', async () => {
            expect(await loginPage.errorMessageWhenCredentialsAreInvalid()).toBe(SignInMessages.INVALID_CREDENTIALS);
        });
    });

    test('The user can\'t sign in if he/she lefts the form empty', async ({ loginPage }) => {
        await test.step('STEP 2: Attempt to submit the form with empty fields', async () => {
            await loginPage.loginForm('', '', false);
            await loginPage.clickOnSignInButton();

            const { usernameError, passwordError } = await loginPage.errorMessagesWhenFormIsEmpty();

            expect(usernameError).toBe(SignInMessages.USERNAME_REQUIRED);
            expect(passwordError).toBe(SignInMessages.PASSWORD_REQUIRED);
        });
    });
});
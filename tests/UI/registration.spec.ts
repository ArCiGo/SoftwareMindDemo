import { test, expect } from '../../fixtures/Fixtures';
import { generateUser } from '../../data/dataGenerators';
import { RegistrationMessages } from '../../constants/Messages';

test.describe('Registration', () => {
    test('The user can register into the platform and log in successfully', async ({ page, loginPage, registerPage, dashboardPage }) => {
        const newUser = generateUser();

        await test.step('STEP 1: Navigate to the Login page and click on \'Register here\' link', async () => {
            await loginPage.goTo();
            await loginPage.clickOnRegisterHereLink();
            
            await expect(registerPage.loginTitle).toBeVisible();
        });

        await test.step('STEP 2: Fill the registration form', async () => {
            await registerPage.registerForm(newUser);
        });

        await test.step('STEP 3: The user should be redirected to the Login page and log in with its created credentials', async () => {
            await expect(registerPage.registerSuccessAlert).toContainText(RegistrationMessages.REGISTRATION_SUCCESSFUL);
            await expect(page).toHaveURL(/login\.html/);
            await expect(loginPage.loginTitle).toBeVisible();

            await loginPage.loginForm(newUser.username, newUser.password, true);
            await loginPage.clickOnSignInButton();

            await expect(page).toHaveURL(/index\.html/);
            await expect(dashboardPage.appTitle).toBeVisible();
        });
    });
});

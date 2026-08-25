import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { DashboardPage } from '../../page-objects/DashboardPage';
import { generateProductData } from '../../data/dataGenerators';
import { CategoryOptions } from '../../enums/CategoryOptions';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('Console log:', msg.text()));
});

test.describe('Product Management', () => {
    test('The user can create a new product, can find it and delete it', async ({ page }) => {
        const newProduct = generateProductData();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await test.step('STEP 1: Navigate to the Login page', async () => {
            await loginPage.goTo();
        });

        await test.step('STEP 2: Fill the login form with valid credentials', async () => {
            await loginPage.loginForm(process.env.VALID_USERNAME as string, process.env.VALID_PASSWORD as string, true);
            await loginPage.clickOnSignInButton()
        });

        await test.step('STEP 3: Verify the user is redirected to the Dashboard page', async () => {
            await expect(async() => {
                await page.waitForURL('**/index.html', { timeout: 5000 });
                expect(await dashboardPage.headerIsLoaded()).toBeTruthy();
            }).toPass({
                timeout: 3600
            });
        });

        await test.step('STEP 4: The user can create a new product', async () => {
            await dashboardPage.addProductForm(newProduct);

            const [isVisible, toastText] = await Promise.all([
                dashboardPage.isSuccessToastVisible(),
                dashboardPage.getSuccessToastMessage(),
                dashboardPage.clickOnSaveButton()
            ]);
            
            expect(isVisible).toBeTruthy();
            expect(toastText).toBe(`Product "${newProduct.name}" created successfully`);
        });

        await test.step('STEP 5: The user looks for the product and validates its data', async () => {
            await dashboardPage.filterByCategory(CategoryOptions.Electronics)
            await dashboardPage.filterByProductName(newProduct.name);

            const card = await dashboardPage.getProductDetails(newProduct.name);
            const expectedFormattedPrice = `$${Number(newProduct.price).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
            
            await expect(card.cardDetails).toBeVisible();
            await expect(card.name).toHaveText(newProduct.name);
            await expect(card.sku).toHaveText(newProduct.sku);
            await expect(card.price).toHaveText(expectedFormattedPrice);
            await expect(card.category).toHaveText(newProduct.category);
            await expect(card.stock).toHaveText(newProduct.inStock ? 'In Stock' : 'Out of Stock');
            await expect(card.description).toHaveText(newProduct.description!);
        });

        await test.step('STEP 6: The user should delete the product and validate that isn\'t displayed in the table', async () => {
            await dashboardPage.deleteProduct(newProduct.name);

            await dashboardPage.filterByProductName(newProduct.name);
            expect((await dashboardPage.getProductDetails(newProduct.name)).cardDetails).not.toBeVisible();
        });
    });
});
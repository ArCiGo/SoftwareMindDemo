import { test, expect } from '../../page-objects/Fixtures'
import { generateProductData } from '../../data/dataGenerators';
import { CategoryOptions } from '../../enums/CategoryOptions';
import { DashboardMessages } from '../../constants/Messages';

test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('Console log:', msg.text()));
});

test.describe('Product Management', () => {
    test('The user can create a new product, can find it and delete it', async ({ page, loginPage, dashboardPage }) => {
        const newProduct = generateProductData();

        await test.step('STEP 1: Navigate to the Login page', async () => {
            await loginPage.goTo();
        });

        await test.step('STEP 2: Fill the login form with valid credentials', async () => {
            await loginPage.loginForm(process.env.VALID_USERNAME as string, process.env.VALID_PASSWORD as string, true);
            await loginPage.clickOnSignInButton()
        });

        await test.step('STEP 3: Verify the user is redirected to the Dashboard page', async () => {
            await expect(async () => {
                await page.waitForURL('**/index.html', { timeout: 5000 });
                expect(await dashboardPage.headerIsLoaded()).toBeTruthy();
            }).toPass({
                timeout: 3600
            });
        });

        await test.step('STEP 4: The user can create a new product', async () => {
            await dashboardPage.addProductForm(newProduct);
            await dashboardPage.clickOnSaveButton();

            const toastText = await dashboardPage.getSuccessToastMessage();
            expect(toastText).toBe(DashboardMessages.productCreated(newProduct.name));
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

            const toastMsg = await dashboardPage.getSuccessToastMessage();
            expect(toastMsg).toBe(DashboardMessages.productDeleted(newProduct.name));

            await dashboardPage.filterByProductName(newProduct.name);
            expect((await dashboardPage.getProductDetails(newProduct.name)).cardDetails).not.toBeVisible();
        });
    });
});
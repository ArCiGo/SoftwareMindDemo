import { test, expect } from '../../fixtures/Fixtures';
import { generateProductData } from '../../data/dataGenerators';
import { CategoryOptions } from '../../enums/CategoryOptions';
import { DashboardMessages } from '../../constants/Messages';

test.describe('Product Management', () => {
    test('The user can create a new product, can find it and delete it', async ({ authenticatedDashboard: dashboardPage }) => {
        // test.setTimeout(60_000);
        const newProduct = generateProductData({ price: '1500' });

        await test.step('STEP 1: The user can create a new product', async () => {
            // newProduct.inStock = false;
            await dashboardPage.addProductForm(newProduct);
            await dashboardPage.clickOnSaveButton();

            await expect(dashboardPage.successToastMessage).toHaveText(
                DashboardMessages.productCreated(newProduct.name),
            );
        });

        await test.step('STEP 2: The user looks for the product and validates its data', async () => {
            await dashboardPage.filterByCategory(CategoryOptions.Electronics);
            await dashboardPage.filterByProductName(newProduct.name);

            const card = dashboardPage.getProductDetails(newProduct.name);
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
        });

        await test.step('STEP 3: The user should delete the product and validate that isn\'t displayed in the table', async () => {
            await dashboardPage.deleteProduct(newProduct.name);

            await expect(dashboardPage.successToastMessage).toHaveText(
                DashboardMessages.productDeleted(newProduct.name),
            );

            await dashboardPage.filterByProductName(newProduct.name);
            await expect(dashboardPage.getProductDetails(newProduct.name).cardDetails).not.toBeVisible();
        });
    });
});

import { Page } from '@playwright/test';
import { IProduct } from '../models/IProduct';
import { CategoryOptions } from '../enums/CategoryOptions';
import { Toasts } from './shared/components/Toasts';

export class DashboardPage {
    // Objects, variables and constants
    private readonly _toasts: Toasts;

    // Constructor
    constructor(public readonly page: Page) {
        this._toasts = new Toasts(page);
    }

    // Actions
    async headerIsLoaded() {
        return await this.page
            .locator('.app-title')
            .isVisible();
    }

    async addProductForm(product: IProduct) {
        await this.page.locator('#product-name').clear();
        await this.page.locator('#product-name').fill(product.name);

        await this.page.locator('#product-sku').clear();
        await this.page.locator('#product-sku').fill(product.sku);

        await this.page.locator('#product-price').clear();
        await this.page.locator('#product-price').fill(product.price);

        await this.page.locator('#product-category').selectOption(product.category);
        await this.page.locator('#product-inStock').setChecked(product.inStock ?? true, { force: true });

        if (product.description) {
            await this.page.locator('#product-description').clear();
            await this.page.locator('#product-description').fill(product.description);
        }
    }

    async clickOnSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async getSuccessToastMessage() {
        return await this._toasts.getSuccessToastMessage();
    }

    async filterByCategory(category: CategoryOptions) {
        await this.page.locator('#category-filter').selectOption(category);
    }

    async filterByProductName(productName: string) {
        await this.page.locator('#search-input').clear();
        await this.page.locator('#search-input').fill(productName);
    }

    async getProductName(productName: string) {
        return await this.page.locator('#product-list')
            .locator('.product-card')
            .filter({ has: this.page.locator('.product-name', { hasText: productName }) });
    }

    async getProductDetails(productName: string) {
        const cardDetails = await this.getProductName(productName);

        return {
            cardDetails,
            name: cardDetails.locator('.product-name'),
            sku: cardDetails.locator('.product-sku'),
            price: cardDetails.locator('.product-price'),
            category: cardDetails.locator('.product-category'),
            stock: cardDetails.locator('.product-stock'),
            description: cardDetails.locator('.product-description'),
        };
    }

    async deleteProduct(productName: string) {
        await this._toasts.waitForSuccessToastGone();

        const productCard = await this.getProductName(productName);

        await productCard.getByRole('button', { name: 'Delete' }).click();
        await this.page.locator('#modal-confirm-btn').click();
    }
}
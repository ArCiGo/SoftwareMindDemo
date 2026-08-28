import { Page } from '@playwright/test';
import { IProduct } from '../models/IProduct';
import { CategoryOptions } from '../enums/CategoryOptions';
import { Toasts } from './shared/components/Toasts';

export class DashboardPage {
    readonly toasts: Toasts;

    constructor(public readonly page: Page) {
        this.toasts = new Toasts(page);
    }

    get appTitle() {
        return this.page.locator('.app-title');
    }

    async addProductForm(product: IProduct) {
        await this.page.locator('#product-name').fill(product.name);
        await this.page.locator('#product-sku').fill(product.sku);
        await this.page.locator('#product-price').fill(product.price);
        await this.page.locator('#product-category').selectOption(product.category);

        const inStock = product.inStock ?? true;
        if (inStock !== (await this.page.locator('#product-inStock').isChecked())) {
            await this.page.locator('label[for="product-inStock"]').click();
        }
    }

    async clickOnSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async filterByProductName(productName: string) {
        await this.page.locator('#search-input').fill(productName);
    }

    async filterByCategory(category: CategoryOptions) {
        await this.page.locator('#category-filter').selectOption(category);
    }

    productCard(productName: string) {
        return this.page.locator('#product-list')
            .locator('.product-card')
            .filter({ has: this.page.locator('.product-name', { hasText: productName }) });
    }

    getProductDetails(productName: string) {
        const cardDetails = this.productCard(productName);

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
        const productCard = this.productCard(productName);

        await productCard.getByRole('button', { name: 'Delete' }).click();
        await this.page.locator('#modal-confirm-btn').click();
    }
}

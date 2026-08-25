import { CategoryOptions } from '../enums/CategoryOptions';

export interface IProduct {
    name: string;
    sku: string;
    price: string;
    category: CategoryOptions;
    inStock?: boolean;
    description?: string;
}
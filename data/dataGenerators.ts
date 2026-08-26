import { faker } from '@faker-js/faker';
import { CategoryOptions } from "../enums/CategoryOptions";
import { IProduct } from "../models/IProduct";
import { IUser } from "../models/IUser";

export function generateUser(): IUser {
    const suffix = faker.string.alphanumeric({ length: 16, casing: 'lower' });
    const username = `ACG_${suffix}`;

    return {
        username,
        email: faker.internet.email({ firstName: 'acg', lastName: suffix, provider: 'example.mx' }),
        password: faker.internet.password()
    };
}

export function generateProductData(overrides?: Partial<IProduct>): IProduct {
    const randomID = faker.string.numeric(4);

    return {
        name: `Automation ${faker.commerce.productName()} ${randomID}`,
        sku: `SKU-${randomID}`,
        price: faker.commerce.price({min:1000,max:9999}),
        category: CategoryOptions.Electronics,
        inStock: true,
        description: faker.commerce.productDescription(),
        ...overrides,
    };
}
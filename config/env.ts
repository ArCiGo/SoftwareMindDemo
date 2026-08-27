import * as dotenv from 'dotenv';

dotenv.config();

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export const env = {
    baseURL: process.env.BASE_URL ?? 'https://softwaremind-assessments.s3.us-east-1.amazonaws.com',
    validUsername: required('VALID_USERNAME'),
    validPassword: required('VALID_PASSWORD'),
    invalidUsername: required('INVALID_USERNAME'),
    invalidPassword: required('INVALID_PASSWORD'),
};

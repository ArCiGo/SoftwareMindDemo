export const SignInMessages = {
    LOGIN_SUCCESSFUL: 'Login successful! Redirecting...',
    INVALID_CREDENTIALS: 'Invalid username or password',
    USERNAME_REQUIRED: 'Username is required',
    PASSWORD_REQUIRED: 'Password is required'
};

export const RegistrationMessages = {
    REGISTRATION_SUCCESSFUL: 'Registration successful! Redirecting to login...'
}

export const DashboardMessages = {
    productCreated: (name: string) => `Product "${name}" created successfully`,
    productDeleted: (name: string) => `Product "${name}" deleted successfully`,
};
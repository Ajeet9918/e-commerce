import { authAPI } from './api';

export const testFrontendAPI = async () => {
    console.log('Testing Frontend API...\n');

    try {
        // Test registration
        console.log('1. Testing Registration...');
        const registerData = await authAPI.register({
            firstName: 'Frontend',
            lastName: 'Test',
            email: 'frontend@example.com',
            password: 'password123'
        });
        console.log('Registration Response:', registerData);

        if (registerData.success) {
            console.log('✅ Frontend Registration successful');

            // Test login
            console.log('\n2. Testing Login...');
            const loginData = await authAPI.login({
                email: 'frontend@example.com',
                password: 'password123'
            });
            console.log('Login Response:', loginData);

            if (loginData.success) {
                console.log('✅ Frontend Login successful');

                // Test get current user
                console.log('\n3. Testing Get Current User...');
                const userData = await authAPI.getCurrentUser();
                console.log('Get Current User Response:', userData);

                if (userData.success) {
                    console.log('✅ Frontend Get current user successful');
                } else {
                    console.log('❌ Frontend Get current user failed');
                }
            } else {
                console.log('❌ Frontend Login failed');
            }
        } else {
            console.log('❌ Frontend Registration failed');
        }
    } catch (error) {
        console.error('❌ Frontend Test failed with error:', error.message);
    }
}; 
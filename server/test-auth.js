const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const BASE_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    console.log('Testing Authentication Endpoints...\n');

    // Test registration
    console.log('1. Testing Registration...');
    try {
        const registerResponse = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                password: 'password123'
            })
        });

        const registerData = await registerResponse.json();
        console.log('Registration Response:', registerData);

        if (registerData.success) {
            console.log('✅ Registration successful');

            // Test login
            console.log('\n2. Testing Login...');
            const loginResponse = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                })
            });

            const loginData = await loginResponse.json();
            console.log('Login Response:', loginData);

            if (loginData.success) {
                console.log('✅ Login successful');

                // Test get current user
                console.log('\n3. Testing Get Current User...');
                const userResponse = await fetch(`${BASE_URL}/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loginData.token}`
                    }
                });

                const userData = await userResponse.json();
                console.log('Get Current User Response:', userData);

                if (userData.success) {
                    console.log('✅ Get current user successful');
                } else {
                    console.log('❌ Get current user failed');
                }
            } else {
                console.log('❌ Login failed');
            }
        } else {
            console.log('❌ Registration failed');
        }
    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }
}

testAuth(); 
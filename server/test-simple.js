const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function testSimple() {
    console.log('Testing simple API endpoints...\n');

    // Test 1: Basic server response
    try {
        console.log('1. Testing basic server response...');
        const response = await fetch('http://localhost:5000/');
        const text = await response.text();
        console.log('Response:', text);
    } catch (error) {
        console.error('Error:', error.message);
    }

    // Test 2: Items API
    try {
        console.log('\n2. Testing items API...');
        const response = await fetch('http://localhost:5000/api/items');
        console.log('Status:', response.status);
        console.log('Headers:', response.headers.get('content-type'));

        if (response.ok) {
            const data = await response.json();
            console.log('Data:', data);
        } else {
            const text = await response.text();
            console.log('Error response:', text);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

    // Test 3: Search API
    try {
        console.log('\n3. Testing search API...');
        const response = await fetch('http://localhost:5000/api/items/search?query=test');
        console.log('Status:', response.status);
        console.log('Headers:', response.headers.get('content-type'));

        if (response.ok) {
            const data = await response.json();
            console.log('Data:', data);
        } else {
            const text = await response.text();
            console.log('Error response:', text);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testSimple(); 
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const BASE_URL = 'http://localhost:5000/api/items';

async function testSearch() {
    console.log('Testing Search API...\n');

    // Test getting all items first
    console.log('1. Testing Get All Items...');
    try {
        const allItemsResponse = await fetch(`${BASE_URL}/`);
        const allItemsData = await allItemsResponse.json();
        console.log(`Found ${allItemsData.length} total items in database`);

        if (allItemsData.length > 0) {
            console.log('Sample item:', allItemsData[0]);
        }
    } catch (error) {
        console.error('Error getting all items:', error.message);
    }

    // Test search functionality
    console.log('\n2. Testing Search API...');
    const searchQueries = ['shirt', 'pants', 'dress', 'shoes'];

    for (const query of searchQueries) {
        try {
            console.log(`\nSearching for: "${query}"`);
            const searchResponse = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
            const searchData = await searchResponse.json();

            if (searchData.success) {
                console.log(`✅ Found ${searchData.count} results for "${query}"`);
                if (searchData.items.length > 0) {
                    console.log('Sample result:', searchData.items[0].name);
                }
            } else {
                console.log(`❌ Search failed for "${query}":`, searchData.message);
            }
        } catch (error) {
            console.error(`❌ Error searching for "${query}":`, error.message);
        }
    }
}

testSearch(); 
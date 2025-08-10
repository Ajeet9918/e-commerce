const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const { Item } = require('./models/itemsModel');

// Import the items collection
const itemsCollection = require('./itemsCollection');

async function populateDatabase() {
    try {
        // Connect to database
        await connectDB();
        console.log('Connected to database');

        // Clear existing items
        await Item.deleteMany({});
        console.log('Cleared existing items');

        // Filter valid items (items with all required fields)
        const validItems = itemsCollection.filter(item =>
            item.name &&
            item.category &&
            item.color &&
            item.type &&
            item.description &&
            item.price &&
            item.size &&
            item.highlights &&
            item.image
        );

        console.log(`Found ${validItems.length} valid items out of ${itemsCollection.length} total items`);

        // Insert valid items
        const result = await Item.insertMany(validItems);
        console.log(`Successfully inserted ${result.length} items`);

        // Test search functionality
        const searchTest = await Item.find({
            $or: [
                { name: { $regex: 'shirt', $options: 'i' } },
                { category: { $regex: 'shirt', $options: 'i' } },
                { type: { $regex: 'shirt', $options: 'i' } },
                { description: { $regex: 'shirt', $options: 'i' } }
            ]
        });
        console.log(`Found ${searchTest.length} items matching 'shirt'`);

        // Test another search
        const searchTest2 = await Item.find({
            $or: [
                { name: { $regex: 'shoes', $options: 'i' } },
                { category: { $regex: 'shoes', $options: 'i' } },
                { type: { $regex: 'shoes', $options: 'i' } },
                { description: { $regex: 'shoes', $options: 'i' } }
            ]
        });
        console.log(`Found ${searchTest2.length} items matching 'shoes'`);

        console.log('Database populated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error populating database:', error);
        process.exit(1);
    }
}

populateDatabase(); 
const { Item } = require("../models/itemsModel")

/* GET request handler */
const getItem = async (req, res) => {
    try {
        const items = await Item.find()
        res.json({
            success: true,
            items: items,
            count: items.length
        })
    } catch (error) {
        console.error('Get items error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching items'
        })
    }
}

/* Search items handler */
const searchItems = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const searchRegex = new RegExp(escapeRegex(query), 'i');

        const items = await Item.find({
            $or: [
                { name: searchRegex },
                { category: searchRegex },
                { type: searchRegex },
                { description: searchRegex }
            ]
        });

        res.json({
            success: true,
            items: items,
            count: items.length,
            query: query
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching items'
        });
    }
}

/* POST Request handler */
const addItem = async (req, res) => {
    const { name, category, type, color, description, price, highlights, size, detail } = req.body;

    if (!name || !category || !type || !color || !description || !price || !highlights || !size) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    const item = {
        name,
        category,
        type,
        color,
        description,
        price,
        image: req.files,
        size: size.split(","),
        highlights: highlights.split(","),
        detail
    };

    try {
        await Item.create(item);
        res.status(201).json({ success: true, message: "Items Add Success" });
    } catch (error) {
        console.error('Add item error:', error);
        res.status(400).json({ success: false, message: "Unable to add item" });
    }
};

/* PUT Request handler */
const updateItem = (req, res) => {
    res.json({ message: "update Item" })
}

/* DELETE Request handler */
const deleteItem = (req, res) => {
    res.json({ message: "delete Item" })
}

module.exports = {
    getItem,
    searchItems,
    addItem,
    updateItem,
    deleteItem
}
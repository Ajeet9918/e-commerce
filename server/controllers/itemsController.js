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

        // Search in multiple fields: name, category, type, description
        const searchRegex = new RegExp(query, 'i'); // 'i' for case-insensitive

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
    const highlights = req.body.highlights.split(",")
    const size = req.body.size.split(",")

    /* The request.body must have all these values */
    const item = {
        name: req.body.name,
        category: req.body.category,
        type: req.body.type,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        image: req.files,
        size: size,
        highlights: highlights,
        detail: req.body.detail
    }

    if (item) {
        await Item.create(item)
        res.status(201).json({
            success: true,
            message: "Items Add Success"
        })
    }
    else {
        res.status(400).json({
            success: false,
            message: "Unable to add item"
        })
    }
}

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
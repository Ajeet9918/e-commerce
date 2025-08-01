/* Schema for the Item document */

const mongoose = require("mongoose")

const itemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        size: {
            type: Array,
            required: true
        },
        highlights: {
            type: Array,
            required: true
        },
        detail: {
            type: String,
            required: true
        },
        image: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const userSchema = mongoose.Schema({
    firstName: {
        type: String,},
    lastName: {
        type: String,},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,  
        required: true,
        minlength: 8
    },
}) ;
const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);
module.exports = {Item, User};
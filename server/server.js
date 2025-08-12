// import path from "path";
// const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const { Item, User } = require("./models/itemsModel");

// Import routes
const authRoutes = require("./routes/auth");
const itemsRoutes = require("./routes/items");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connect to DB with error handling
const startServer = async () => {
    try {
        await connectDB();
        
        // Routes
        app.get("/", (req, res) => {
            res.send("API is running");
        });

        // Use routes
        app.use("/api/auth", authRoutes);
        app.use("/api/items", itemsRoutes);
        app.use("/api/payment", require("./routes/payment"));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log("Server is running on port", PORT));
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

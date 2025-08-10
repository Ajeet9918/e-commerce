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

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


// const __dirname = path.resolve();

// Routes
app.get("/", (req, res) => {
    res.send("API is running");
});



// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);

app.use("/api/payment", require("./routes/payment"));




// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/client", "dist", "index.html"));
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on port", PORT));

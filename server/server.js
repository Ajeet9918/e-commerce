// import path from "path";
// const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const { Item, User } = require("./models/itemsModel");

// Connect to DB
connectDB();

// Middlewares
app.use(cors({
  origin: "https://backend-paw0.onrender.com",  // exact URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


// const __dirname = path.resolve();

// Routes
app.get("/", (req, res) => {
    res.send("API is running");
});

app.post("/api/items", async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json({ success: true, message: "Item saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to save item" });
    }
});

app.post("/register", async (req, res) => {
    console.log("Incoming body:", req.body);
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        res.json({ success: true, message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.use("/api/payment", require("./routes/payment"));


// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/client", "dist", "index.html"));
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on port", PORT));

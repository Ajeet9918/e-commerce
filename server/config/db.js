const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        // Try to connect to MongoDB
        const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";
        const conn = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected: ", conn.connection.host);
    }
    catch(err) {
        console.log("MongoDB connection failed:", err.message);
        console.log("Starting server without database connection for testing...");
        // Don't exit the process, let the server start without DB for testing
    }
}

module.exports = connectDB
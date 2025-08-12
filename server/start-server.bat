@echo off
set MONGO_URI=mongodb+srv://testuser:testpassword@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
set JWT_SECRET=your_super_secret_jwt_key_2024
set PORT=5000
npm run dev

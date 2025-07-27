const express = require("express")
const router = express.Router()
const cors = require("cors")
const { initializePayment, verifyPayment } = require("../controllers/paymentController")

// initialize payment endpoint
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with production URL
};
router.post('/', cors(corsOptions), initializePayment);

// router.post('/', cors(), initializePayment)

// verfiy payment endpoint
router.get('/verify/:id', cors(), verifyPayment)

module.exports = router
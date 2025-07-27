const axios = require("axios")

const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize"
const CHAPA_AUTH = process.env.CHAPA_AUTH // || register to chapa and get the key

// const initializePayment = async (req, res) => {

//     const config = {
//         headers: {
//             Authorization: CHAPA_AUTH
//         }
//     }

//     // chapa redirect you to this url when payment is successful
//     const CALLBACK_URL = "http://localhost:3000"

//     // a unique reference given to every transaction
//     const TEXT_REF = "tx-myecommerce12345-" + Date.now()

//     // form data
//     const data = {
//         amount: req.body.amount,
//         currency: 'ETB',
//         email: 'ato@ekele.com',
//         first_name: 'Ato',
//         last_name: 'Ekele',
//         tx_ref: TEXT_REF,
//         callback_url: CALLBACK_URL
//     }

//     // post request to chapa
//     await axios.post(CHAPA_URL, data, config)
//         .then((response) => {
//             res.send(response.data.data.checkout_url)
//             console.log(response.data)
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ error: 'Payment initialization failed' });
//         });

//     /* res.json({res: "message", url: CALLBACK_URL}) */
// }

const initializePayment = async (req, res) => {
  try {
    if (!CHAPA_AUTH) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const config = {
      headers: {
        Authorization: CHAPA_AUTH,
        'Content-Type': 'application/json'
      }
    };

    const CALLBACK_URL = "http://localhost:3000/payment-success";
    const TEXT_REF = "tx-" + Date.now();

    // Validate required fields
    if (!req.body.amount || !req.body.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = {
      amount: req.body.amount.toString(), // Chapa expects string
      currency: 'ETB',
      email: req.body.email,
      first_name: req.body.first_name || 'Customer',
      last_name: req.body.last_name || 'User',
      tx_ref: TEXT_REF,
      callback_url: CALLBACK_URL
    };

    const response = await axios.post(CHAPA_URL, data, config);
    res.send(response.data.data.checkout_url);
    
  } catch (err) {
    console.error('Payment error:', err.response?.data || err.message);
    res.status(500).json({ 
      error: 'Payment processing failed',
      details: err.response?.data 
    });
  }
};

const verifyPayment = async (req, res) => {
    await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
        .then((response) => {
            console.log(response)
            res.json({ message: response })
        })
        .catch((err) => {
            console.log("Payment can't be verfied", err)
            res.json({ error: err })
        })

    res.json({ message: "response", param: req.params.id })
}

module.exports = { initializePayment, verifyPayment }
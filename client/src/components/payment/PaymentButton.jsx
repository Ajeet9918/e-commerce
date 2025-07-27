import axios from 'axios';
import { useState } from 'react';

const PaymentButton = ({ amount, email, firstName, lastName }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/payment', {
        amount, // Amount in ETB
        email,
        first_name: firstName,
        last_name: lastName,
      });

      // Redirect to Chapa checkout page
      window.location.href = response.data; // checkout_url from backend
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment initialization failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : 'Pay with Chapa'}
    </button>
  );
};

export default PaymentButton;
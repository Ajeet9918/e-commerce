import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const { tx_ref } = useParams(); // Get transaction reference from URL

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await axios.get(`http://localhost:5000/payment/verify/${tx_ref}`);
        alert('Payment verified!');
        // Save order to database or update UI
      } catch (error) {
        console.error('Verification failed:', error);
      }
    };
    verifyPayment();
  }, [tx_ref]);

  return <div>Payment successful! Verifying...</div>;
};

export default PaymentSuccess;
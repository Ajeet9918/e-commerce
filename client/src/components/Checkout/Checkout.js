import './Checkout.css';
import { useContext, useState } from 'react';
import { CartItemsContext } from '../../Context/CartItemsContext';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartItemsContext);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Calculate total amount
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            // Prepare payment data
            const paymentData = {
                amount: cartTotal,
                email: user?.email || 'guest@example.com',
                first_name: user?.name?.split(' ')[0] || 'Guest',
                last_name: user?.name?.split(' ')[1] || 'User',
            };

            // Initialize payment with backend
            const response = await axios.post(
                'https://backend-paw0.onrender.com/api/payment',
                paymentData
            );

            // Redirect to Chapa checkout page
            window.location.href = response.data;

        } catch (err) {
            console.error('Payment error:', err);
            setError('Failed to initialize payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout Summary</h2>

            <div className="checkout-summary">
                <div className="checkout-items">
                    {cartItems.map(item => (
                        <div key={item._id} className="checkout-item">
                            <img
                                src={`https://backend-paw0.onrender.com/public/${item.category}/${item.image[0].filename}`}
                                alt={item.name}
                                className="checkout-item-image"
                            />
                            <div className="checkout-item-details">
                                <h4>{item.name}</h4>
                                <p>Qty: {item.quantity}</p>
                                <p>Price: ETB {item.price * item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="checkout-total">
                    <h3>Order Total</h3>
                    <p>ETB {cartTotal.toFixed(2)}</p>
                    <button
                        onClick={handlePayment}
                        disabled={loading || cartItems.length === 0}
                        className="payment-button"
                    >
                        {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';
import './RegisterCard.css';

const RegisterCard = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError('All fields are required');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            setIsLoading(false);
            return;
        }

        try {
            // Replace with your actual API endpoint
            const response = await axios.post('https://backend-paw0.onrender.com/', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                // Store user data and token
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Update auth context
                login(response.data.user, response.data.token);
                
                // Redirect to home with welcome message
                navigate('/', { 
                    state: { 
                        welcomeMessage: `Welcome ${formData.firstName}! Your account has been created successfully.` 
                    } 
                });
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return ( 
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                
                {error && <div className="register__error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="register__inputs">
                    <div className="fname__input__container reg__input__container">
                        <label htmlFor="firstName" className="fname__label input__label">
                            First name
                        </label>
                        <input 
                            id="firstName"
                            name="firstName"
                            type="text" 
                            className="fname__input register__input" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="lname__input__container reg__input__container">
                        <label htmlFor="lastName" className="lname__label input__label">
                            Last name
                        </label>
                        <input 
                            id="lastName"
                            name="lastName"
                            type="text" 
                            className="lname__input register__input"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="email__input__container reg__input__container">
                        <label htmlFor="email" className="email__label input__label">
                            Email
                        </label>
                        <input 
                            id="email"
                            name="email"
                            type="email" 
                            className="email__input register__input" 
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="password__input__container reg__input__container">
                        <label htmlFor="password" className="password__label input__label">
                            Password
                        </label>
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            className="password__input register__input" 
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            minLength="8"
                        />
                    </div>

                    <div className="register__button__container">
                        <button 
                            type="submit" 
                            className="register__button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="register__other__actions">
                    <div className="register__login__account">
                        Already have an account? <Link to="/account/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default RegisterCard;
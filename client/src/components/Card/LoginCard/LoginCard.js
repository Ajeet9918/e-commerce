import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { authAPI } from '../../../utils/api';
import './LoginCard.css';

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await authAPI.login({ email, password });

            if (data.success) {
                // Update auth context
                login(data.user, data.token);

                // Show success message and redirect
                alert("Login successful!");
                // Redirect to the page they were trying to access, or home
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true });
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleLogin} className="login__inputs">
                    {error && (
                        <div className="error__message" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input
                            type="email"
                            className="email__input login__input"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label">Password</label>
                        <input
                            type="password"
                            className="password__input login__input"
                            placeholder="**********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="login__button__container">
                        <button
                            type="submit"
                            className="login__button"
                            disabled={loading}
                        >
                            {loading ? 'LOGGING IN...' : 'LOGIN'}
                        </button>
                    </div>
                </form>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have account? <Link to="/account/register">Create account</Link> </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCard;

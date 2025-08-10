import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login page with the return url
        return <Navigate to="/account/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute; 
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import { useAuth } from "../Context/AuthContext";
import './Home.css'; // Create this file for styling

const Home = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [featuredItems, setFeaturedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Set page title
    TabTitle(user ? `${user.firstName}'s Home - SHOPKARO` : "Home - SHOPKARO");

    // Generate welcome message
    const welcomeMessage = location.state?.welcomeMessage || 
                         (user ? `Welcome back, ${user.firstName}!` : null);

    useEffect(() => {
        const fetchFeaturedItems = async () => {
            try {
                const res = await axios.get("https://shema-backend.vercel.app/api/items");
                setFeaturedItems(res.data);
            } catch (err) {
                console.error("Error fetching featured items:", err);
                setError("Failed to load featured items. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedItems();
        window.scrollTo(0, 0);
    }, []);

    return ( 
        <Fragment>
            {/* Welcome Banner */}
            {welcomeMessage && (
                <div className="welcome-banner">
                    <div className="welcome-content">
                        <h2>{welcomeMessage}</h2>
                        {user && (
                            <p className="welcome-subtext">
                                Happy shopping! Enjoy our latest collections.
                            </p>
                        )}
                    </div>
                </div>
            )}

            <Landing />
            <FeaturedCategories />
            
            {isLoading ? (
                <div className="loading-indicator">Loading featured items...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <FeaturedItems items={featuredItems}/>
            )}
        </Fragment>
    );
};
 
export default Home;
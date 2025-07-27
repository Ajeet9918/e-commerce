import './Landing.css';
import land from '../../asset/brand/men2.png';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Landing = () => {
    return ( 
        <div className="landing__container">
            <div className="landing__header__container">
                <div className="landing__header">
                    <h3 className="landing__header__discount">UP TO 15% DISCOUNT</h3>
                    <h1 className="landing__header__main">Elevate Your Style with Premium Fashion</h1>
                    <p className="landing__header__sub">Discover curated collections for the modern individual</p>
                    <Link to="/shop">
                        <Button 
                            variant='contained' 
                            sx={[ 
                                { 
                                    width: '200px', 
                                    height: '50px', 
                                    borderRadius: '25px', 
                                    fontWeight: '700', 
                                    backgroundColor: '#9A7B4F', // Earthy gold
                                    color: 'white',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }, 
                                {
                                    '&:hover': {  
                                        backgroundColor: "#7A5C3F", // Darker gold
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                                    }
                                }
                            ]}
                        >
                            SHOP NOW
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="landing__image__container">
                <img className="landing__image" src={land} alt="Fashion Model"/>
            </div>
        </div>
    );
}
 
export default Landing;
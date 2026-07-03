import { Link } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ItemCard from '../../Card/ItemCard/ItemCard';
import ReactLoading from 'react-loading';
import './FeaturedItems.css'

const FeaturedItems = (props) => {
    const featured = props.items && props.items.length > 0
        ? props.items.slice(0, 8)   // just take the first 8 available items
        : null;

    return (
        <div className="featured__products__container">
            <div className="featured__products">
                <div className="featured__products__header">
                    <h3 className='featured__items__header__big'>Featured Items </h3>
                    <Link to="/shop" className='featured__header__small'>Show all<ArrowRightAltIcon /></Link>
                </div>
                <div className="featured__products__header__line"></div>
                <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
                    {!featured && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto'/>}
                    { featured &&
                        <div className="featured__products__card__container">
                            {featured.map((item, idx) => (
                                <ItemCard key={item._id || idx} item={item} category="featured"/>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default FeaturedItems;
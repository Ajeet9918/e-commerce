import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Item from '../components/Item/Item';

const ProductView = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("https://backend-paw0.onrender.com/api/items")
            .then(res => {
                const foundItem = res.data.find(item => item._id === id);
                setItem(foundItem);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch product:", err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
            {loading ? (
                <ReactLoading type="balls" color="#FFE26E" height={100} width={100} />
            ) : item ? (
                <Item item={item} />
            ) : (
                <p className="text-danger">Product not found.</p>
            )}
        </div>
    );
};

export default ProductView;

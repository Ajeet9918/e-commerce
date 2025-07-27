import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';

const CategoryView = () => {
    const { id } = useParams(); // id = men, women, or kids
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        axios.get("https://shema-backend.vercel.app/api/items")
            .then(res => {
                const filtered = res.data.filter(item => item.category === id);
                setItems(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);
    const getCategoryTitle = (categoryId) => {
        switch (categoryId) {
            case 'men': return "Men's Fashion";
            case 'women': return "Women's Fashion";
            case 'kids': return "Kids Fashion";
            default: return null;
        }
    };
    const categoryTitle = getCategoryTitle(id);

    return (
        <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
            {loading ? (
                <ReactLoading type="balls" color="#FFE26E" height={100} width={100} className="m-auto" />
            ) : (
                categoryTitle ? (
                    <Category name={categoryTitle} items={items} category={id} />
                ) : (
                    <h4 className="text-center text-danger">No category found</h4>
                )
            )}
        </div>
    );
};

export default CategoryView;


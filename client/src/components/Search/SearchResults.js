import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import './SearchResults.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const { searchQuery } = useContext(SearchContext);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const query = searchParams.get('query') || searchQuery;

    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const fetchSearchResults = async (searchTerm) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/items/search?query=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();

            if (data.success) {
                setResults(data.items);
            } else {
                setError(data.message || 'No results found');
                setResults([]);
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Error fetching search results');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="search__container">
                <div className="search__loading">
                    <h2>Searching for "{query}"...</h2>
                    <div className="loading__spinner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="search__container">
                <div className="search__error">
                    <h2>Error: {error}</h2>
                    <p>Try searching for something else.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="search__container">
            <div className="search__header">
                <h1>Search Results for "{query}"</h1>
                <p>{results.length} item{results.length !== 1 ? 's' : ''} found</p>
            </div>

            {results.length === 0 ? (
                <div className="search__no_results">
                    <h2>No results found for "{query}"</h2>
                    <p>Try searching with different keywords or browse our categories.</p>
                </div>
            ) : (
                <div className="search__results">
                    {results.map((item) => (
                        <div key={item._id} className="search__item">
                            <div className="search__item__image">
                                {item.image && item.image.length > 0 ? (
                                    <img
                                        src={`http://localhost:5000/${item.image[0].path}`}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <span>No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="search__item__details">
                                <h3>{item.name}</h3>
                                <p className="search__item__category">{item.category}</p>
                                <p className="search__item__type">{item.type}</p>
                                <p className="search__item__price">${item.price}</p>
                                <p className="search__item__description">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults; 
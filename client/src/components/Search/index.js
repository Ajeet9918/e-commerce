import { useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import './index.css';

const Search = () => {
    const { searchQuery } = useContext(SearchContext);
    const [, setSearchParam] = useSearchParams(); // Using comma to ignore first value

    useEffect(() => {
        setSearchParam({ query: searchQuery }, { replace: true });
    }, [searchQuery, setSearchParam]); // Added all dependencies

    return ( 
        <div className="search__container">
            <div className="search__container__header">
                <h1>No results found for "{searchQuery}"</h1>
            </div>
        </div>
    );
};
 
export default Search;
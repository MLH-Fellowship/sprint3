import React, { useState } from 'react';
import backend from '../api/backend';

import SearchBar from './Search/SearchBar';
import SearchResults from './Search/SearchResults';

const App = () => {

        // state for search results as a result of search function
        const [searchResults, setSearchResults] = useState([]);


    // function to search for a term (used in SearchBar component)
    // also used to update search results component
    const search = async (term) => {
        // make request to backend
        const response = await backend.get(`/search/${term}`);
        setSearchResults(response.data.tracks.items);
    };


    return (
        <div>
            APP
            <SearchBar search={search} />
            <SearchResults searchResults={searchResults} />
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import backend from '../api/backend';

import Library from './Library/Library';
import SearchBar from './Search/SearchBar';
import SearchResults from './Search/SearchResults';

const App = () => {

    // STATE

    // state for search results as a result of search function
    const [searchResults, setSearchResults] = useState([]);
    // state for search term
    const [searchTerm, setSearchTerm] = useState('');
    // state for library
    const [library, setLibrary] = useState([]);
    
    // FUNCTIONS

    // function to search for a term (used in SearchBar component)
    // also used to update search results component
    const search = async (term) => {
        // make request to backend
        const response = await backend.get(`/search/${term}`);
        setSearchResults(response.data.tracks.items);
    };

    // function to add song to library
    // also 
    const addTrack = (track) => {
        setLibrary([...library, track]);
    }

    


    return (
        <div className="ui container">
            <Library library={library} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={search} />
            <SearchResults searchResults={searchResults} addTrack={addTrack} />
        </div>
    );
};

export default App;

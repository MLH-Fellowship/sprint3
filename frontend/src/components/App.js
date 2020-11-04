import React, { useState } from 'react';
import backend from '../api/backend';

import SearchBar from './Search/SearchBar';

const App = () => {

    // function to search for a term (used in SearchBar component)
    // also used to update search results component
    const search = async (term) => {
        // make request to backend
        const response = await backend.get(`/search/${term}`);
        console.log(response.data.tracks.items);
    };

    return (
        <div>
            APP
            <SearchBar search={search} />
        </div>
    );
};

export default App;
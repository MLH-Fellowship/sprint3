import React, { useEffect } from 'react';
import backend from '../api/backend';

const App = () => {

    // function to search for term and update search results
    const search = async (term) => {
        const response = await backend.get(`/search/${term}`);
        console.log(response.data.tracks.items)
    }
    useEffect(() => {
        search('zindagi')
    }, [])

    return (
        <div>
            APP
        </div>
    );
};

export default App;
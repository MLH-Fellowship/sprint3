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

    // function to obtain 'audio features' for a song (given an id)
    const getAudioFeatures = async (id) => {
        // make request to backend
        const response = await backend.get(`/audio-features/${id}`);
        // store data in object
        const audioFeaturesObj = {'audioFeatures': response.data.data[0]};
        // return object
        return audioFeaturesObj;
    }

    // function to add song to library
    // to reduce API call, audio features (another API request) is only made when track is added to library
    const addTrack = async (track) => {
        const { id } = track;
        // get audio features
        const audioFeatures = await getAudioFeatures(id);
        // add to track obj
        const trackNew = {...track, ...audioFeatures};
        // add to library
        setLibrary([...library, trackNew]);
    };

    // function to remove song from library
    const removeTrack = track => {
        const { id } = track;
        setLibrary(library.filter(track => track.id !== id));
    };

    


    return (
        <div className="ui container">
            <Library library={library} removeTrack={removeTrack} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={search} />
            <SearchResults searchResults={searchResults} addTrack={addTrack} library={library} />
        </div>
    );
};

export default App;

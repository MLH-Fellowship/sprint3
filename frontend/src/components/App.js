import React, { useState } from 'react';
import backend from '../api/backend';

import Library from './Library/Library';
import Playlists from './Library/Playlists';
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
    // state for playlists
    const [playlists, setPlaylists] = useState([]);
    // state for tabs
    const tabs = ['Library', 'Search', 'Playlists'];
    const [tabSelected, setTabSelected] = useState(tabs[0]);
    
    // FUNCTIONS

    // function to search for a term (used in SearchBar component)
    // also used to update search results component
    const search = async (term) => {
        // make request to backend
        const response = await backend.get(`/search/${term}`);
        const results = response.data.tracks.items;
        // add checked boolean (for checkbox)
        setSearchResults(results.map(result => {
            return {checked: false, ...result}
        }));
    };

    // function to obtain 'audio features' for a track
    const getAudioFeatures = async (track) => {
        const { id } = track;
        // make request to backend
        const response = await backend.get(`/audio-features/${id}`);
        // store data in object
        const audioFeaturesObj = {'audio_features': response.data.data[0]};
        // return track
        return {...track, ...audioFeaturesObj};
    }

    // function to add songs to library
    // to reduce API call, audio features (another API request) is only made when track is added to library
    const addTracks = async (tracks) => {
        // get audio features for all tracks
        const promises = tracks.map(track => getAudioFeatures(track));
        // add to library
        Promise.all(promises).then(values => {
            setLibrary([...library, ...values])
        })
    };

    // function to remove songs from library
    const removeTracks = tracks => {
        // get ids of tracks in list
        const tracks_ids = tracks.map(track => track.id);
        setLibrary(library.filter(track => tracks_ids.includes(track.id) === false));
    };

    // function to make request to backend with library and generate playlists
    const generatePlaylists = async () => {
        const options = { tracks: library }
        const response = await backend.post(`/generate-playlists`, options);
        const { tracks } = response.data
        setPlaylists(tracks);
    };
    
    // tab setup
    

    const tabsRendered = tabs.map(tab => {
        const active = tab === tabSelected ? 'active' : '';
        return (
            <div key={tab}
                className={`${active} item`}
                style={{'cursor': 'pointer'}}
                onClick={() => setTabSelected(tab)}
            >
                {tab}
            </div>
        )
    });

    // conditionally render tab
    const tabComponentRendered = (tab) => {
        switch (tab) {
            case 'Library':
                return (
                    <Library library={library} removeTracks={removeTracks} />  
                );
            case 'Search':
                return (
                    <>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={search} />
                        <SearchResults 
                            searchResults={searchResults}
                            setSearchResults={setSearchResults}
                            addTracks={addTracks}
                            removeTracks={removeTracks}
                            library={library}
                        />
                    </>
                );
            case 'Playlists':
                return (
                    <Playlists playlists={playlists} generatePlaylists={generatePlaylists} />
                );
            default:
                return null;
        };
    };

    return (
        <div className="ui container">
            <div className="ui top attached tabular menu">
                {tabsRendered}
            </div>
            {tabComponentRendered(tabSelected)}
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import backend from '../../api/backend';

const Playlists = ({ library }) => {

    const [tracks, setTracks] = useState([])
    
    const generatePlaylists = async () => {
        const options = { tracks: library }
        const response = await backend.post(`/generate-playlists`, options);
        const { tracks } = response.data
        setTracks(tracks);
    };

    const tracksRendered = tracks.map(track => {
        return (
            <li key={track.id}>{track.name} {track.kmeans}</li>
        )
    })

    return (
        <div>
            <button 
                className="ui primary button"
                onClick={generatePlaylists}
            >
                Generate Playlists
            </button>
            <div>
                {tracksRendered}
            </div>
        </div>
    );
};

export default Playlists;
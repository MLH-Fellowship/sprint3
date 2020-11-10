import React from 'react';
import backend from '../../api/backend';

const Playlists = ({ library }) => {
    
    const generatePlaylists = async () => {
        const options = { tracks: library }
        const response = await backend.post(`/generate-playlists`, options);
        console.log(response);
    };

    return (
        <div>
            <button 
                className="ui primary button"
                onClick={generatePlaylists}
            >
                Generate Playlists
            </button>
        </div>
    );
};

export default Playlists;
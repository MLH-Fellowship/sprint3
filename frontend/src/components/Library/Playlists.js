import React from 'react';
import backend from '../../api/backend';

const Playlists = ({ library }) => {
    
    const generatePlaylists = async () => {
        const response = await backend.get(`/generate-playlists`);
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
import React from 'react';

const Playlists = ({ library }) => {
    
    const generatePlaylists = () => {
        console.log('GENERATED');
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
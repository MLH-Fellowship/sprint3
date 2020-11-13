import React from 'react';

const Playlists = ({ playlists, generatePlaylists }) => {


    const tracksRendered = playlists.map(track => {
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
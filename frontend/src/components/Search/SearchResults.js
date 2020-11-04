import React from 'react';
import '../../styles/searchresult.css';

const SearchResults = ({ searchResults, addTrack, library }) => {

    // component styles
    const searchResultStyles = {
        songCard: {
            backgroundColor: '#191414',
        },
        songContent: {
            color: '#ffffff',
            margin: '10px 0px 10px 5px',
        },
        songMeta: {
            color: '#beb8b8',
            margin: '0px 0px 5px 5px',
        },
        songButton: {
            backgroundColor: '#1db954',
            color: '#ffffff',
        },
    };

    // loop through search results (arrary)
    const resultsRendered = searchResults.map(result => {
        const { id, name, artists, duration_ms, album } = result;
        const sep = '| ';

        // extract artist names from artists array
        const artistNames = artists.map(artist => artist.name);

        // logic to disable 'add' button if song is already in library
        const disabled = library.map(track => track.id).includes(id) ? 'disabled' : '';

        return (
            <div key={id} className='card song-card' style={searchResultStyles.songCard}>
                <div className='content'>
                    <div className='header' style={searchResultStyles.songContent}>
                        <h2>{name}</h2>
                    </div>
                    <div className='meta' style={searchResultStyles.songMeta}>
                        <span>{Math.round(duration_ms / 60000)} minutes</span>
                        {sep}
                        <span>{artistNames.join(', ')}</span>
                    </div>
                </div>

                <div className='image'>
                    <img src={album.images[1].url} alt={name} />
                </div>
                {/*<div className='ui bottom attached button' 
                    style={searchResultStyles.songButton}
                    onClick={() => addTrack(result)}
                >
                    <i className='add icon' />
                    Add Song
                </div>*/}
                <button className={`ui positive ${disabled} button`} onClick={() => addTrack(result)}>
                    <i className="add icon" />
                    Add Track
                </button>
            </div>
        );
    });

    return (
        <div>
            <div className='ui four cards'>{resultsRendered}</div>
        </div>
    );
};

export default SearchResults;

import React from 'react';
import '../../styles/searchresult.css';

const SearchResults = ({ searchResults, addTrack, removeTrack, library }) => {

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

        // boolean for whether or not song is in library
        const isInLibrary = library.map(track => track.id).includes(id);
        // logic for button properties
        const buttonObj = {};
        buttonObj['sign'] = isInLibrary ? 'negative' : 'positive';
        buttonObj['func'] = isInLibrary ? removeTrack : addTrack;
        buttonObj['icon'] = isInLibrary ? 'minus' : 'add';
        buttonObj['label'] = isInLibrary ? 'Remove' : 'Add';

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
                <button className={`ui ${buttonObj['sign']} button`} onClick={() => buttonObj['func'](result)}>
                    <i className={`${buttonObj['icon']} icon`} />
                    {`${buttonObj['label']} Track`}
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

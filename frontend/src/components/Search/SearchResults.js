import React, { useState, useEffect } from 'react';
import '../../styles/searchresult.css';

const SearchResults = ({ searchResults, setSearchResults, addTrack, removeTrack, library, setLibrary }) => {


    // function to update checkbox checked value (for a track)
    const handleCheckbox = (track) => {
        const { id } = track;
        setSearchResults(searchResults.map(result => {
            // if track is the one that was clicked, change its checked value
            if (result.id === id) {
                result.checked = !result.checked;
            };
            return result
        }))
    };

    // function to handle select all checkbox
    const handleSelectAll = (checkedValue) => {
        // if true, set all checkboxes to checked, else uncheck
        setSearchResults(searchResults.map(result => {
            result.checked = checkedValue;
            return result;
        }))
        
    }

    

    // loop through tracks to create elements for rendering
    const tracksRendered = searchResults.map(track => {
        const { id, name, artists, duration_ms, checked, audioFeatures } = track;

         // extract artist names from artists array
         const artistNames = artists.map(artist => artist.name);
         const artistString = artistNames.join(', ');

         // calculated song duration in minutes and seconds
         const duration_minutes = Math.floor(duration_ms/60000);
         const duration_seconds = duration_ms % 60;
         const duration_seconds_pad = duration_seconds > 10 ? '' : '0'
         const duration_label = `${duration_minutes}:${duration_seconds_pad}${duration_seconds}`;

        // boolean for whether or not song is in library
        const isInLibrary = library.map(track => track.id).includes(id);
        // logic for button properties
        const buttonObj = {};
        buttonObj['sign'] = isInLibrary ? 'negative' : 'positive';
        buttonObj['func'] = isInLibrary ? removeTrack : addTrack;
        buttonObj['icon'] = isInLibrary ? 'minus' : 'add';

        return (
            <React.Fragment key={id}>
                <tr>
                    <td>
                        <input 
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleCheckbox(track)}
                        />
                    </td>
                    {/*<td>
                        <button 
                            className={`ui ${buttonObj['sign']} icon button`} 
                            onClick={() => buttonObj['func'](track)}
                        >
                            <i className={`${buttonObj['icon']} icon`} />
                        </button>
                    </td>*/}
                    <td>{name}</td>
                    <td>{artistString}</td>
                    <td>{duration_label}</td>
                    {/*<td>{JSON.stringify(audioFeatures)}</td>*/}
                   
                </tr>
            </React.Fragment>
        )
    })


    return (
        <div>
            <button>Add to Library</button>
            <button>Remove from Library</button>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>
                            <input 
                                type="checkbox"
                                onChange={(e) => handleSelectAll(e.target.checked)}
                            /> Select All
                        </th>
                        {/*<th>Add/Remove</th>*/}
                        <th>Name</th>
                        <th>Artist(s)</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {tracksRendered}
                </tbody>
            </table>
        </div>

    );

    //// component styles
    //const searchResultStyles = {
    //    songCard: {
    //        backgroundColor: '#191414',
    //    },
    //    songContent: {
    //        color: '#ffffff',
    //        margin: '10px 0px 10px 5px',
    //    },
    //    songMeta: {
    //        color: '#beb8b8',
    //        margin: '0px 0px 5px 5px',
    //    },
    //    songButton: {
    //        backgroundColor: '#1db954',
    //        color: '#ffffff',
    //    },
    //};

    //// loop through search results (arrary)
    //const resultsRendered = searchResults.map(result => {
    //    const { id, name, artists, duration_ms, album } = result;
    //    const sep = '| ';

    //    // extract artist names from artists array
    //    const artistNames = artists.map(artist => artist.name);

    //    // boolean for whether or not song is in library
    //    const isInLibrary = library.map(track => track.id).includes(id);
    //    // logic for button properties
    //    const buttonObj = {};
    //    buttonObj['sign'] = isInLibrary ? 'negative' : 'positive';
    //    buttonObj['func'] = isInLibrary ? removeTrack : addTrack;
    //    buttonObj['icon'] = isInLibrary ? 'minus' : 'add';
    //    buttonObj['label'] = isInLibrary ? 'Remove' : 'Add';

    //    return (
    //        <div key={id} className='card song-card' style={searchResultStyles.songCard}>
    //            <div className='content'>
    //                <div className='header' style={searchResultStyles.songContent}>
    //                    <h2>{name}</h2>
    //                </div>
    //                <div className='meta' style={searchResultStyles.songMeta}>
    //                    <span>{Math.round(duration_ms / 60000)} minutes</span>
    //                    {sep}
    //                    <span>{artistNames.join(', ')}</span>
    //                </div>
    //            </div>

    //            <div className='image'>
    //                <img src={album.images[1].url} alt={name} />
    //            </div>
    //            <button className={`ui ${buttonObj['sign']} button`} onClick={() => buttonObj['func'](result)}>
    //                <i className={`${buttonObj['icon']} icon`} />
    //                {`${buttonObj['label']} Track`}
    //            </button>
    //        </div>
    //    );
    //});

    //return (
    //    <div>
    //        <div className='ui four cards'>{resultsRendered}</div>
    //    </div>
    //);
};

export default SearchResults;

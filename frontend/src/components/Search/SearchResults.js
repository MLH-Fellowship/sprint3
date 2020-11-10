import React, { useState } from 'react';
import '../../styles/searchresult.css';

const SearchResults = ({ searchResults, addTrack, removeTrack, library }) => {

    // state for songs to be added to/deleted from library
    const [tracksToTrack, setTracksToTrack] = useState([]);

    // state for 'select all' checkbox
    const [isCheckedSelectAll, setIsCheckedSelectAll] = useState(false);
    // text to display for select/deselect
    const selectAllText = isCheckedSelectAll ? 'Deselect All' : 'Select All';

    // function to disable checkbox if track already in library
    const disableCheckbox = track => {
        const { id } = track;
        return library.map(t => t.id).includes(id);
    }

    // function to handle checking/unchecking of checkbox
    const handleCheckbox = (checked, track) => {
        // if checkbox is checked, add to tracksToTrack
        if (checked) {
            setTracksToTrack([...tracksToTrack, track]);
        } else {
            // else remove it
           setTracksToTrack(tracksToTrack.filter(t => t.id !== track.id))
        }
    };

    
    // loop through tracks to create elements for rendering
    const tracksRendered = searchResults.map(track => {
        const { id, name, artists, duration_ms, audioFeatures } = track;

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
                            disabled={disableCheckbox(track)}
                            onChange = {(e) => handleCheckbox(e.target.checked, track)}
                        />
                    </td>
                    <td>
                        <button 
                            className={`ui ${buttonObj['sign']} icon button`} 
                            onClick={() => buttonObj['func'](track)}
                        >
                            <i className={`${buttonObj['icon']} icon`} />
                        </button>
                    </td>
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
                                onChange={() => setIsCheckedSelectAll(!isCheckedSelectAll)}
                            /> {selectAllText}
                        </th>
                        <th>Add/Remove</th>
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

import React from 'react';

const Library = ({ library, removeTrack }) => {

    // message for when there are no songs in library
    if (library.length === 0) {
        return "You don't have any songs in your library. Head over the the 'Search' tab to start adding songs.";
    }

    // loop through tracks to create elements for rendering
    const tracksRendered = library.map(track => {
        const { id, name, artists, duration_ms, audioFeatures } = track;

         // extract artist names from artists array
         const artistNames = artists.map(artist => artist.name);

        return (
            <React.Fragment key={id}>
                <tr>
                    <td>{name}</td>
                    <td>{artistNames.join(', ')}</td>
                    <td>{Math.round(duration_ms/60000)} minutes</td>
                    {/*<td>{JSON.stringify(audioFeatures)}</td>*/}
                    <td>
                        <button 
                            className="ui mini negative icon button"
                            onClick={() => removeTrack(track)}
                        >
                            <i className="x icon" />
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        )
    })

    return (
        <table className="ui celled table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Artist(s)</th>
                    <th>Duration</th>
                    {/*<th>Audio Features</th>*/}
                </tr>
            </thead>
            <tbody>
                {tracksRendered}
            </tbody>
        </table>
    );
};

export default Library;
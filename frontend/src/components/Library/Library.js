import React from 'react';

const Library = ({ library, removeTrack }) => {

    // loop through tracks to create elements for rendering
    const tracksRendered = library.map(track => {
        const { id, name, artists, duration_ms } = track;

         // extract artist names from artists array
         const artistNames = artists.map(artist => artist.name);

        return (
            //<div key={id}>
            //    <div className="title">
            //        <i className="dropdown icon" />
            //    {/*<button className="ui negative icon button" onClick={() => removeTrack(track)}>
            //        <i className="minus icon" />
            //    </button>*/}
            //    </div>
            //    <div className="content">
            //        {name}
            //    </div>
            //</div>
            <>
                <tr>
                    <td>{name}</td>
                    <td>{artistNames}</td>
                    <td>{Math.round(duration_ms/60000)} minutes</td>
                    <td>
                        <button 
                            className="ui mini negative icon button"
                            onClick={() => removeTrack(track)}
                        >
                            <i className="x icon" />
                        </button>
                    </td>
                </tr>
            </>
        )
    })

    return (
        <div className="ui celled table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Artist(s)</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {tracksRendered}
            </tbody>
        </div>
    );
};

export default Library;
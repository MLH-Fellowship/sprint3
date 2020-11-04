import React from 'react';

const Library = ({ library, removeTrack }) => {

    // loop through tracks to create elements for rendering
    const tracksRendered = library.map(track => {
        const { id, name } = track;

        return <div key={id}>
            {name}
            <button className="ui negative icon button" onClick={() => removeTrack(track)}>
                <i className="minus icon" />
            </button>
        </div>
    })

    return (
        <div>
            {tracksRendered}
        </div>
    );
};

export default Library;
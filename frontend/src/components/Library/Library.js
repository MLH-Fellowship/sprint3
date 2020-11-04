import React from 'react';

const Library = ({ library, removeTrack }) => {

    // loop through tracks to create elements for rendering
    const tracksRendered = library.map(track => {
        const { id, name } = track;

        return (
            <div key={id}>
                <div className="title">
                {name}
                {/*<button className="ui negative icon button" onClick={() => removeTrack(track)}>
                    <i className="minus icon" />
                </button>*/}
                </div>
            </div>
        )
    })

    return (
        <div className="ui styled accordion">
            {tracksRendered}
        </div>
    );
};

export default Library;
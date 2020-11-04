import React from 'react';

const Library = ({ library }) => {

    // loop through tracks to create elements for rendering
    const tracksRendered = library.map(track => {
        const { id, name } = track;

        return <div key={id}>
            {name}
        </div>
    })

    return (
        <div>
            {tracksRendered}
        </div>
    );
};

export default Library;
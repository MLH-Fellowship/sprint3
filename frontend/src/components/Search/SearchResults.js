import React from 'react';

const SearchResults = ({ searchResults }) => {

    console.log(searchResults[0]);
    // loop through search results (arrary)
    const resultsRendered = searchResults.map(result => {
        const { id, name, artists, duration_ms, popularity, album } = result;

        // extract artist names from artists array
        const artistNames = artists.map(artist => artist.name)

        return (
            <div key={id} className="card">
                <div className="content">
                    <div className="header">
                        <span>{name}</span>
                    </div>
                </div>
                <div className="meta">
                    <span>{artistNames.join(', ')}</span>
                </div>
                <div className="meta">
                    <span>
                        {Math.round(duration_ms / 60000)} minutes
                        Popularity: {popularity}
                    </span>
                </div>
                <div className="image">
                    <img src={album.images[1].url} alt={name} />
                </div>
                <div className="ui bottom attached button">
                    <i className="add icon" />
                    Add Song
                </div>
            </div>
        );
    });

    return (
        <div className="ui cards">
            {resultsRendered}
        </div>
    );
};

export default SearchResults;
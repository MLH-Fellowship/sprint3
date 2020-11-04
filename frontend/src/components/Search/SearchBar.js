import React, { useState } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, search }) => {
    
    // function for when search is submitted
    const onFormSubmit = event => {
        // prevent page from reloading
        event.preventDefault();
        // run search function
        search(searchTerm);
        // reset search term to empty string
        //setSearchTerm('');
    };

    return (
        <div className='ui search'>
            <form onSubmit={onFormSubmit}>
                <div className='ui left icon input'>
                    <input
                        type='text'
                        value={searchTerm}
                        placeholder='Search...'
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ borderRadius: '50px' }}
                    />
                    <i className='search icon' />
                </div>
            </form>
        </div>
    );
};

export default SearchBar;

import React from 'react';

const Error = ({errorMessage}) => {
    return (
        <div className='error-wrapper'>
            <h4>{errorMessage}</h4>
        </div>
    );
};

export default Error;

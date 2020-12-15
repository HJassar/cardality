import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div>
                <Link to="/story" id='currentStoryId'>Story 1</Link>
            </div>
        </>
    );
};

export default Home;

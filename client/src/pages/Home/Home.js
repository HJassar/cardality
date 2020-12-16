import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    return (
        <>
            <div className='story-link'>
                <Link to='/story' id='currentStoryId'>
                    Story 1
                </Link>
            </div>
        </>
    );
};

export default Home;

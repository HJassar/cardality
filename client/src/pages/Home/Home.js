import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    return (
        <>
            <Link to='/story' id='currentStoryId' className='Story_link'>
                <div className='Story_card'>
                    <h3>Story 1</h3>
                </div>
            </Link>
        </>
    );
};

export default Home;

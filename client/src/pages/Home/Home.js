import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { setStoryName, setStoryId } from '../../redux/story/story.actions';

import Error from '../../components/Error/Error'

import './Home.scss';

const Home = ({ setStoryId, setStoryName }) => {
    const [storyArr, setStoryArr] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get('/stories')
            .then((res) => {
                setStoryArr(res.data);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    setError(!error)
                }
            });
    }, []);

    const handleClick = (e) => {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        setStoryId(id);
        setStoryName(name);
    };

    return (
        <>
            {error ? (
                <Error />
            ) : (
                storyArr.map((story) => {
                    return (
                        <Link
                            to={`/story/${story.storyId}`}
                            className='story-link'>
                            <div className='block'>
                                <h2
                                    className='story-name'
                                    key={story.storyId}
                                    onClick={handleClick}
                                    data-id={story.storyId}
                                    data-name={story.name}>
                                    {story.name}
                                </h2>
                            </div>
                        </Link>
                    );
                })
            )}
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setStoryId: (id) => dispatch(setStoryId(id)),
    setStoryName: (name) => dispatch(setStoryName(name))
});

export default connect(null, mapDispatchToProps)(Home);

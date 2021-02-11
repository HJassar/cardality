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
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        axios
            .get('/stories')
            .then((res) => {
                setStoryArr(res.data);
            })
            .catch((err) => {
                setError(!error)
                setErrorMessage(err.response.statusText)
            });
    }, []);

    const handleClick = (e) => {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        setStoryId(id);
        setStoryName(name);
    };

    return (
        <div className='Home'>
            {error ? (
                <Error errorMessage={errorMessage} />
            ) : (
                    storyArr.map((story) => {
                        return (
                            <Link
                                to={`/story/${story.storyId}`}
                                className='story-link'>
                                <div className='story-link-stack block story_three-card'>
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
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setStoryId: (id) => dispatch(setStoryId(id)),
    setStoryName: (name) => dispatch(setStoryName(name))
});

export default connect(null, mapDispatchToProps)(Home);

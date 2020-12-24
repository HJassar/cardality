import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Home.scss";


const Home = () => {

  let stories;
  const [loading, setLoading] = useState(true)

  const [storyDOMs, setStoryDOMs] = useState('loading');

  axios
    .get(`/stories`)
    .then((res) => {
      setLoading(false)
      setStoryDOMs(
        res.data.map(story => {
          return (
            <div className="Story_card">
              <Link
                to={`/story/${story.storyId}`}
                className="Story_link">
                <h2>
                  {story.name}
                </h2>
              </Link>
            </div>
          )
        })
      )
    })



  //David, be sure to set the currentStoryName in addition to the currentStoryId when you do the Redux portion. -Paul
  if (loading) {
    return (
      <>
        loading
      </>
    )
  }


  return (<>
    {storyDOMs}
  </>)

};

export default Home;

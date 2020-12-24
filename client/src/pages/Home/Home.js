import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";


import { setStoryName, setStoryId } from "../../redux/story/story.actions";

import "./Home.scss";

const Home = ({ setStoryId, setStoryName }) => {
  const [storyArr, setStoryArr] = useState([]);

  useEffect(() => {
    axios
      .get("/stories")
      .then((res) => {
        setStoryArr(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e) => {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    setStoryId(id);
    setStoryName(name);
  };

  return (
    <>
      {storyArr.map((story) => {
        return (
          <Link to={`/story/${story.storyId}`} className="story-link">
            <div className='block'>
              <h2
                className="story-name"
                key={story.storyId}
                onClick={handleClick}
                data-id={story.storyId}
                data-name={story.name}
              >
                {story.name}
              </h2>
            </div>
          </Link>
        );
      })}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setStoryId: (id) => dispatch(setStoryId(id)),
  setStoryName: (name) => dispatch(setStoryName(name)),
});

export default connect(null, mapDispatchToProps)(Home);

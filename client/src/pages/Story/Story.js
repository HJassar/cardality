import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

const Story = ({ testString, currentStoryId, currentPage }) => {
  const [story, setStory] = useState([]);
  //Axios call to pull the right story and page number, changing this if needed once backend is setup. Story ID should be passed into the redux currentStoryId state from the home page component. currentPage defaults to 1.
  axios
    .get(`/story?id=${currentStoryId}&page=${currentPage}`)
    .then((res) => {
      console.log(res);
      setStory(res);
    })
    .catch((err) => console.log(err.message));
  // TEMPORARY DATA UNTIL BACKEND IS SETUP
  const CARDDATA = [
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
    { cardText: "lorem lorem lorem lorem" },
  ];
  //CREATE A RENDER USING MAP AFTER THE AXIOS CALL RETURNS THE ARRAY OF CARDS.
  //LOAD 10 at a time
  const handleClick = () => {
    //Logic for handling loading more feature
  };
  return (
    <div className="Story">
      <h1>I'M THE STORY PAGE</h1>
      <h2>REDUX TEST: {testString}</h2>
      <div>
        <ul>
          {CARDDATA.map((card) => {
            return <li>{card.cardText}</li>;
          })}
        </ul>
        <ul>
          {/* {story.map((card) => {
            return <li>{card.cardText}</li>;
          })} */}
        </ul>
        <button onClick={handleClick}>LOAD MORE</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  testString: state.story.testString,
  currentStoryId: state.story.currentStoryId,
  currentPage: state.story.currentPage,
});

export default connect(mapStateToProps)(Story);

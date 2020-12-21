import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

const Story = ({ currentStoryId, currentPage }) => {
  useEffect(() => {
    //temp route to grab id, later this ID will be accessed from the Redux State "currentStoryId", which will be set from the home page when you click on the available stories.
    axios
      .get(`/home`)
      .then((res) => {
        console.log("STORY ID TESTER: ", res.data[0]);
        setStory(res.data[0]);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const [story, setStory] = useState([]);
  //Axios call to pull the right story and page number, changing this if needed once backend is setup. Story ID should be passed into the redux currentStoryId state from the home page component. currentPage defaults to 1.
  // axios
  //   .get(`/story?id=${currentStoryId}&page=${currentPage}`)
  //   .then((res) => {
  //     console.log(res);
  //     setStory(res);
  //   })
  //   .catch((err) => console.log(err.message));
  // TEMPORARY DATA UNTIL BACKEND IS SETUP, use "story" instead of "TEMPSTORY"
  const TEMPSTORY = {
    id: 1,
    name: "Story 1",
    cards: [
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
      {
        text: "Lorem lorem lorem lorem",
      },
    ],
  };
  //LOAD 10 cards at a time
  const handleClick = () => {
    //Logic for handling loading more feature
  };
  return (
    <div className="Story">
      <h1>{TEMPSTORY.name}</h1>
      <div>
        <ul>
          {TEMPSTORY.cards.map((card) => {
            return <li>{card.text}</li>;
          })}
        </ul>
        <button onClick={handleClick}>LOAD MORE</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentStoryId: state.story.currentStoryId,
  currentPage: state.story.currentPage,
});

export default connect(mapStateToProps)(Story);

import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  setStoryName,
  addCards,
  changePage,
} from "../../redux/story/story.actions";

import axios from "axios";

import Loader from "react-loader-spinner";

import "./Story.scss";

const Story = ({
  currentStoryId,
  nextStoryPage,
  currentStoryName,
  currentStoryCards,
  setStoryName,
  addCards,
  changePage,
}) => {
  const [cardsLoading, setCardsLoading] = useState(false);
  const [maxCards, setMaxCards] = useState(0);

  const pullCards = () => {
    setCardsLoading(true);
    //refactor card pulling once able to access currentStoryId from state
    axios
      .get(`/stories`)
      .then((res) => {
        //Axios call to pull the right story and page number. Story ID should be passed into the redux currentStoryId state from the home page component. currentPage defaults to 1.
        setStoryName(res.data[0].name);
        axios
          //Change later to currentStoryId and remove first axios call
          .get(`/stories/${res.data[0].storyId}?page=${nextStoryPage}`)
          .then((res) => {
            //Refactor later into a batch of cards instead of individual. Had a bug where it was putting all the text in a single <li></li>.
            for (let card of res.data.requestedCards) {
              addCards(card);
            }
            //Increase the page by 1
            changePage(1);
            setMaxCards(res.data.numberOfCards);
            setCardsLoading(false);
            console.log(res);
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    //Once page loads, initial pull of cards
    if (nextStoryPage === 1) {
      pullCards();
    }
  }, []);

  //LOAD 10 cards at a time
  const handleClick = () => {
    //Logic for handling loading more feature
    pullCards();
  };
  return (
    <div className="Story">
      <h1 className="Story_name">{currentStoryName}</h1>
      <div>
        <ul>
          {currentStoryCards
            ? currentStoryCards.map((card, index) => {
                return (
                  <li className="Story_card" key={index}>
                    {card}
                  </li>
                );
              })
            : null}
        </ul>
        {currentStoryCards.length !== maxCards ? (
          !cardsLoading ? (
            <div>
              <button className="Story_button" onClick={handleClick}>
                LOAD MORE
              </button>
            </div>
          ) : (
            <div>
              <Loader
                className="Story__loader"
                type="ThreeDots"
                timeout={3000} //3 secs
              />
            </div>
          )
        ) : (
          <div>END OF STORY</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentStoryId: state.story.currentStoryId,
  nextStoryPage: state.story.nextStoryPage,
  currentStoryName: state.story.currentStoryName,
  currentStoryCards: state.story.currentStoryCards,
});

const mapDispatchToProps = (dispatch) => ({
  setStoryName: (name) => dispatch(setStoryName(name)),
  addCards: (cards) => dispatch(addCards(cards)),
  changePage: (value) => dispatch(changePage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Story);

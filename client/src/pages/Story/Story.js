import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  addCards,
  changePage,
  setMaxCards,
} from "../../redux/story/story.actions";

import axios from "axios";

import Loader from "react-loader-spinner";

import "./Story.scss";

const Story = ({match,
  currentStoryId,
  nextStoryPage,
  currentStoryName,
  currentStoryCards,
  addCards,
  changePage,
  setMaxCards,
  maxCards,
}) => {
  
  
  const storyId = match.params.id;
  console.log(storyId);

  const [cardsLoading, setCardsLoading] = useState(false);

  const pullCards = () => {
    setCardsLoading(true);
    //refactor card pulling once able to access currentStoryId from state
    axios
      .get(`/stories/${currentStoryId}?page=${nextStoryPage}`)
      .then((res) => {
        //Refactor later into a batch of cards instead of individual. Had a bug where it was putting all the text in a single <li></li>.
        addCards(res.data.requestedCards);
        //Increase the page by 1
        changePage(1);
        setMaxCards(res.data.numberOfCards);
        setCardsLoading(false);
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
                  // <li className="Story_card" key={index}>
                  <>
                    {card}
                  </>
                  // </li>

                );
              })
            : null}
        </ul>
        {currentStoryCards.length !== maxCards ? (
          !cardsLoading ? (
            <div>
              <button className="Story__load-more" onClick={handleClick}>
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
  maxCards: state.story.maxCards,
});

const mapDispatchToProps = (dispatch) => ({
  addCards: (cards) => dispatch(addCards(cards)),
  changePage: (value) => dispatch(changePage(value)),
  setMaxCards: (value) => dispatch(setMaxCards(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Story);

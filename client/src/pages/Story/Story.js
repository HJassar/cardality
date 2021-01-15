import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  addCards,
  changePage,
  setMaxCards,
} from "../../redux/story/story.actions";

import querystring from 'query-string'

import axios from "axios";

import Loader from "react-loader-spinner";

import "./Story.scss";
import { useLocation } from "react-router";

const Story = ({ match,
  location,
  currentStoryId,
  nextStoryPage,
  currentStoryName,
  currentStoryCards,
  addCards,
  changePage,
  setMaxCards,
  maxCards,
}) => {


  // Apparently using queries with react-router requires a package
  const parsed = querystring.parse(location.search);
  const page = parsed.page || 1;
  console.log(page); 

  const storyId = match.params.id;
  console.log(storyId);

  const [cardsLoading, setCardsLoading] = useState(false);


  // console.log(location.search.indexOf('page'))
  // console.log(location.search.splice();


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
    <>
      <h1 className="Story__name">{currentStoryName}</h1>
      <div>
        <ul>
          {currentStoryCards
            ? currentStoryCards.map((cardText, index) => {
              return (
                // Let's make a component for Card
                <div className='Card block' key={index}>
                  {cardText}
                </div>
              );
            })
            : (
              <div>
                <Loader
                  className="Story__loader"
                  type="ThreeDots"
                  timeout={3000} //3 secs
                />
              </div>
            )}
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
    </>
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

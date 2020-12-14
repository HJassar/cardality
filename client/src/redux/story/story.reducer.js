import StoryActionTypes from "./story.types";

const INITIAL_STATE = {
  storyIds: [],
  currentStoryId: null, //DAVID: Set this to the story button's ID on the home page before loading the story component
  currentPage: 1,
  testString: "This is a Redux Test String. Yay! Redux is all hooked up!",
};

const storyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case QuizActionTypes.SET_QUIZ_DATA:
    //   return {
    //     ...state,
    //     quizData: action.payload
    //   }
    default:
      return state;
  }
};

export default storyReducer;

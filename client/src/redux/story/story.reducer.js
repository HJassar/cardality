import StoryActionTypes from "./story.types";

const INITIAL_STATE = {
  storyIds: [],
  currentStoryId: null, //DAVID: Set this to the story button's ID on the home page before loading the story component
  nextStoryPage: 1,
  currentStoryName: "",
  currentStoryCards: [],
  maxCards: 0,
};

const storyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StoryActionTypes.SET_STORY_ID:
      return {
        ...state,
        currentStoryId: action.payload,
      };
    case StoryActionTypes.SET_STORY_NAME:
      return {
        ...state,
        currentStoryName: action.payload,
      };
    case StoryActionTypes.ADD_CARDS:
      return {
        ...state,
        currentStoryCards: [...state.currentStoryCards, ...action.payload],
      };
    case StoryActionTypes.CHANGE_PAGE:
      return {
        ...state,
        nextStoryPage: state.nextStoryPage + action.payload,
      };
    case StoryActionTypes.SET_MAX_CARDS:
      return {
        ...state,
        maxCards: action.payload,
      };
    default:
      return state;
  }
};

export default storyReducer;

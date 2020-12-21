import StoryActionTypes from "./story.types";

export const setStoryName = (name) => ({
  type: StoryActionTypes.SET_STORY_NAME,
  payload: name,
});

export const addCards = (cards) => ({
  type: StoryActionTypes.ADD_CARDS,
  payload: cards,
});

//Eventually refactor this into a batch of adding cards, rather than by single cards.
export const changePage = (value) => ({
  type: StoryActionTypes.CHANGE_PAGE,
  payload: value,
});

import StoryActionTypes from "./story.types";

export const setStoryId = (id) => ({
  type: StoryActionTypes.SET_STORY_ID,
  payload: id,
});

export const setStoryName = (name) => ({
  type: StoryActionTypes.SET_STORY_NAME,
  payload: name,
});

export const addCards = (cards) => ({
  type: StoryActionTypes.ADD_CARDS,
  payload: cards,
});

export const changePage = (value) => ({
  type: StoryActionTypes.CHANGE_PAGE,
  payload: value,
});

export const setMaxCards = (value) => ({
  type: StoryActionTypes.SET_MAX_CARDS,
  payload: value,
});

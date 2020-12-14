import { combineReducers } from "redux";

import storyReducer from "./story/story.reducer";

export default combineReducers({
  story: storyReducer,
});

import { combineReducers } from "redux";
import { user } from "./user/reducer";
import { moviesWatched } from "./moviesWatched/reducer";

export default combineReducers({
  user,
  moviesWatched
});

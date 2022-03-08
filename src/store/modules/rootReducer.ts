import { combineReducers } from "redux";
import { user } from "./user/reducer";
import { movies } from "./movies/reducer";

export default combineReducers({
  user,
  movies
});

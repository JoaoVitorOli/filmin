import { atom } from "recoil";

export const moviesWatchedState = atom({
  key: 'moviesWatched',
  default: 0,
});
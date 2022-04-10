import { Reducer } from "redux";
import produce from "immer";

interface IMoviesWatched{
  count: number;
}

const INITIAL_STATE: IMoviesWatched = {
  count: 0
}

export const moviesWatched: Reducer<IMoviesWatched> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch(action.type) {
      case "SET_MOVIES_WATCHED": {
        const numberOfMoviesWatched = action.payload.value;
        
        draft.count = numberOfMoviesWatched;

        break;
      }
      default: {
        return draft;
      }
    }
  });
}
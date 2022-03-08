import { Reducer } from "redux";
import produce from "immer";

interface IMovie {
  id: number;
  name: string,
  posterPath: string,
  averange: number,
  date: string,
  isChecked: boolean,
}

export const movies: Reducer<IMovie[]> = (state = [], action) => {
  return produce(state, draft => {
    switch(action.type) {
      case "SET_INITIAL_MOVIES": {
        const movies: IMovie[] = action.payload.movies;

        if (movies.length > 0) {
          movies.map((movie: any) => {
            draft.push(movie);
          });
        }

        break;
      }
      case "ADD_MOVIE": {
        const movie: IMovie = action.payload.movie;
        
        draft.unshift(movie);

        break;
      }
      case "ADD_SHARED_MOVIES": {
        const movies: IMovie[] = action.payload.movies;
        
        movies.map(movie => {
          draft.unshift(movie);
        });

        break;
      }
      case "CHECK_MOVIE": {
        const movieId: number = action.payload.movieId;

        const movie = draft.find(item => item.id === movieId)!;

        movie.isChecked = !movie?.isChecked;

        break;
      }
      case "DELETE_MOVIE": {
        const movieId: number = action.payload.movieId;

        draft.splice(draft.findIndex(movie => movie.id === movieId), 1);

        break;
      }
      case "DELETE_ALL_CHECKED_MOVIE": {
        const moviesWatched = draft.filter(movie => movie.isChecked === true).length;

        for(let x = 1; x <= moviesWatched; x++) {
          draft.splice(draft.findIndex(movie => movie.isChecked === true), 1);
        }

        break;
      }
      case "REORDER_MOVIES": {
        const movies: IMovie[] = action.payload.movies;

        draft.splice(draft.findIndex(movie => movie.id), movies.length);

        movies.map(movie => {
          draft.push(movie);
        });

        break;
      }
      default: {
        return draft;
      }
    }
  });
}
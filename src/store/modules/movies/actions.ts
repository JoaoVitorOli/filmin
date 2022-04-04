type IMovie = {
  id?: string | number;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  isChecked: boolean;
}

export function setInitialMovies(movies: IMovie[]) {
  return {
    type: "SET_INITIAL_MOVIES",
    payload: {
      movies
    }
  }
}

export function addMovie(movie: IMovie) {
  return {
    type: "ADD_MOVIE",
    payload: {
      movie
    }
  }
}

export function addSharedMovies(movies: IMovie[]) {
  return {
    type: "ADD_SHARED_MOVIES",
    payload: {
      movies
    }
  }
}

export function reorderMovies(movies: IMovie[]) {
  return {
    type: "REORDER_MOVIES",
    payload: {
      movies
    }
  }
}

export function changeUserPhoto(path: string) {
  return {
    type: "CHANGE_USER_PHOTO",
    payload: {
      path
    }
  }
}

export function checkMovie(movieId: number) {
  return {
    type: "CHECK_MOVIE",
    payload: {
      movieId
    }
  }
}

export function deleteMovie(movieId: number) {
  return {
    type: "DELETE_MOVIE",
    payload: {
      movieId
    }
  }
}

export function deleteAllCheckedMovie() {
  return {
    type: "DELETE_ALL_CHECKED_MOVIE",
    payload: {

    }
  }
}

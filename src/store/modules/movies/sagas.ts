import { all, takeLatest } from "redux-saga/effects";
import getRealm from "../../../services/realm";
import { addMovie, checkMovie, deleteMovie, reorderMovies, addSharedMovies } from "./actions";

type SaveMovieRequest = ReturnType<typeof addMovie>;
type CheckMovieRequest = ReturnType<typeof checkMovie>;
type DeleteMovieRequest = ReturnType<typeof deleteMovie>;
type OnDragEndMoviesRequest = ReturnType<typeof reorderMovies>;
type saveSharedMoviesRequest = ReturnType<typeof addSharedMovies>;

interface IMovie {
  id: number;
  name: string,
  posterPath: string,
  averange: number,
  date: string,
  isChecked: boolean,
}

function* saveMovieIntoRealm({ payload }: SaveMovieRequest) {
  const { movie } = payload;

  const data = {
    id: movie.id,
    name: movie.name,
    posterPath: movie.posterPath,
    averange: movie.averange,
    date: movie.date || "",
    isChecked: movie.isChecked,
    updatedAt: new Date()
  }

  const realm: Realm = yield getRealm();

  realm.write(() => {
    realm.create("Movie", data);
  });
}

function* checkMovieRequest({ payload }: CheckMovieRequest) {
  const { movieId } = payload;

  const realm: Realm = yield getRealm();

  realm.write(() => {
    const data = realm.objectForPrimaryKey<IMovie>("Movie", movieId)!;

    data.isChecked = !data.isChecked
  });
}

function* deleteMovieRequest({ payload }: DeleteMovieRequest) {
  const { movieId } = payload;

  const realm: Realm = yield getRealm();
  
  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey("Movie", movieId));
  });
}

function* deleteAllCheckedMovieRequest() {
  const realm: Realm = yield getRealm();
  
  realm.write(() => {
    const data = realm.objects<IMovie>("Movie").filtered("isChecked = true");

    data.map((movie) => {
      realm.delete(realm.objectForPrimaryKey("Movie", movie.id));
    });
  });
}

function* onReorderMovies({ payload }: OnDragEndMoviesRequest) {
  const { movies } = payload;

  const moviesReversed = movies.reverse();

  const realm: Realm = yield getRealm();
  
  realm.write(() => {
    realm.deleteAll();

    moviesReversed.map(movie => {
      realm.create("Movie", movie);
    });
  });
}

function* saveSharedMovies({ payload }: saveSharedMoviesRequest) {
  const { movies } = payload;

  // const moviesReversed = movies;

  const realm: Realm = yield getRealm();
  
  realm.write(() => {
    movies.map(movie => {
      realm.create("Movie", movie);
    });
  });
}

export default all([
  takeLatest("ADD_MOVIE", saveMovieIntoRealm),
  takeLatest("CHECK_MOVIE", checkMovieRequest),
  takeLatest("DELETE_MOVIE", deleteMovieRequest),
  takeLatest("DELETE_ALL_CHECKED_MOVIE", deleteAllCheckedMovieRequest),
  takeLatest("REORDER_MOVIES", onReorderMovies),
  takeLatest("ADD_SHARED_MOVIES", saveSharedMovies),
]);

export {};
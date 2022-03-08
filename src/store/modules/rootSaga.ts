import { all } from "redux-saga/effects";

import user from "./user/sagas";
import movies from "./movies/sagas";

export default function* rootSaga() {
  // @ts-ignore
  return yield all([
    user,
    movies
  ]);
}

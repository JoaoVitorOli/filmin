import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

interface IUserInfo {
  id: string;
  name: string;
  profile: string;
}

export interface IUserState {
  user: IUserInfo
}

interface IMovie {
  id?: number;
  name: string,
  posterPath: string,
  averange: number,
  date: string,
  isChecked: boolean,
}

export interface IMovieState {
  movies: IMovie[]
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

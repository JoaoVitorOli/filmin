import React, { 
  lazy, 
  Suspense, 
  useEffect, 
  useState
} from "react";
import { 
  View, 
  Text, 
  FlatList, 
} from "react-native";
import withObservables from '@nozbe/with-observables';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';

// import { movies } from "../../data/movies";
import { theme } from "../../styles/theme";
import { styles } from "./styles";
import { Model } from "@nozbe/watermelondb";
import { database } from "../../db/index.native";
import { getAllMovies } from "../../db/services/Movie";
import Movie from "../../db/model/Movie";
import { useSelector } from "react-redux";
import { IMovieState } from "../../store";

const MovieCard = lazy(() => import("./MovieCard"));

interface IMoviesProps {
  item: IMoviesItemProps
}

interface IMoviesItemProps {
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  isChecked: boolean;
}

interface MovieListProps {
  movies?: Movie[];
}

const renderItem = ({ item }: IMoviesProps) => {
  return (
    <Suspense fallback={
      <Text style={{color: theme.colors.text}}>Carregando...</Text>
    }>
      <MovieCard
        item={item}
      />
    </Suspense>
  )
};

export const MovieList = () => {
  const movies = useSelector<IMovieState, IMoviesItemProps[]>(state => {
    return state.movies;
  });

  // console.log(movies);

  // const TOTAL_OF_PAGE_NUMBER = movies.length / 10;

  // const [pages, setPages] = useState(1);
  // const [moviesState, setMoviesState] = useState(() => {
  //   if (movies.length > 10) {
  //     let moviesFiltered: IMoviesItemProps[] = [];

  //     for (let index = 0; index < 10; index++) {
  //       moviesFiltered.push(movies[index]);
  //     }

  //     return moviesFiltered;
  //   }

  //   return movies;
  // });

  // const onEnd = () => {
  //   if (pages <= TOTAL_OF_PAGE_NUMBER) {
  //     const nextPage = pages + 1;
  //     let moviesFiltered = moviesState;

  //     setPages(state => state + 1);

  //     for (let index = pages * 10; index < nextPage * 10; index++) {
  //       if (!movies[index]) {
  //         index = nextPage * 10;

  //         return;
  //       }

  //       moviesFiltered.push(movies[index]);
  //     }

  //     setMoviesState(moviesFiltered);
  //   }
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        // onEndReached={onEnd}
        style={styles.list}
        ListFooterComponent={
          <View style={{
            height: 30
          }} />
        }
        ListHeaderComponent={
          <View style={{
            height: 6
          }} />
        }
      />
    </View>
  );
}

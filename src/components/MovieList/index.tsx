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

// const MemoMovieCard = lazy(() => import("./MovieCard"));
import { MovieCard } from "./MovieCard";

interface IMoviesProps {
  item: IMoviesItemProps
}

interface IMoviesItemProps {
  id: string;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  isChecked: boolean;
}

interface MovieListProps {
  movies: IMoviesItemProps[];
}

const renderItem = ({ item }: IMoviesProps) => {
  return (
    <Suspense fallback={
      <Text style={{color: theme.colors.text}}>Carregando...</Text>
    }>
      <MovieCard
        movies={item}
      />
    </Suspense>
  )
};

const MovieList = ({ movies }: MovieListProps) => {
  // const TOTAL_OF_PAGE_NUMBER = movies.length / 10;

  // const [pages, setPages] = useState(1);
  // const [moviesState, setMoviesState] = useState(() => {
  //   if (movies && movies.length > 10) {
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
        data={movies.reverse()}
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

const db = database.collections.get('movies');
const observeMovies = () => db.query().observe();

const enhance = withObservables([], () => ({
  movies: observeMovies(),
}));

// @ts-ignore
export default enhance(MovieList);
// const EnhancerenderItem = enhance(renderItem);

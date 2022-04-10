import React, { 
  lazy, 
  Suspense, 
} from "react";
import { 
  View, 
  Text, 
  FlatList, 
} from "react-native";
import withObservables from '@nozbe/with-observables';

import { theme } from "../../styles/theme";
import { styles } from "./styles";
import { database } from "../../db/index.native";

const MemoMovieCard = lazy(() => import("./MovieCard"));

interface IMoviesProps {
  item: IMoviesItemProps
}

interface IMoviesItemProps {
  id: string;
  name: string;
  posterPath: string;
  movieAverange: string;
  movieDate: string;
  movieStatus: string;
}

interface MovieListProps {
  movies: IMoviesItemProps[];
}

const renderItem = ({ item }: IMoviesProps) => {
  return (
    <Suspense fallback={
      <Text style={{color: theme.colors.text}}>Carregando...</Text>
    }>
      <MemoMovieCard
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

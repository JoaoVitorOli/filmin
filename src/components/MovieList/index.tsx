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

const MovieCard = lazy(() => import("./MovieCard"));

interface IMoviesProps {
  item: IMoviesItemProps
}

interface IMoviesItemProps {
  id: string | number;
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
        item={item}
      />
    </Suspense>
  )
};

// @ts-ignore
export const MovieList = ({ movies }) => {  
  // const [movies, setMovies] = useState<IMoviesItemProps[]>([]);

  console.log("---------------------");
  console.log(movies);
  console.log("---------------------");

  const TOTAL_OF_PAGE_NUMBER = movies.length / 10;

  const [pages, setPages] = useState(1);
  const [moviesState, setMoviesState] = useState(() => {
    if (movies.length > 10) {
      let moviesFiltered: IMoviesItemProps[] = [];

      for (let index = 0; index < 10; index++) {
        moviesFiltered.push(movies[index]);
      }

      return moviesFiltered;
    }

    return movies;
  });

  // useEffect(() => {
  //   const getMovies = async () => {
  //     const moviesFetched = await getAllMovies();
  
  //     setMovies(moviesFetched!);
  //   };
  
  //   getMovies();
  // }, []);

  const onEnd = () => {
    if (pages <= TOTAL_OF_PAGE_NUMBER) {
      const nextPage = pages + 1;
      let moviesFiltered = moviesState;

      setPages(state => state + 1);

      for (let index = pages * 10; index < nextPage * 10; index++) {
        if (!movies[index]) {
          index = nextPage * 10;

          return;
        }

        moviesFiltered.push(movies[index]);
      }

      setMoviesState(moviesFiltered);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={moviesState}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        onEndReached={onEnd}
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

// const enhance = withObservables(['movies'], ({ movies }) => ({
//   movies: movies.observe(),
// }));

// export const EnhancedMovieList = enhance(MovieList);

export default withDatabase(withObservables(['movies'], ({ movies }) => ({
  movies: database.collections.get('movies').query().observe(),
}))(MovieList));

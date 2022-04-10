import React, { 
  lazy, 
  Suspense, 
  useEffect, 
  useState 
} from "react";
import { 
  FlatList, 
  StyleSheet, 
  Text, 
} from "react-native";
import FastImage from "react-native-fast-image";
import { theme } from "../../styles/theme";

const MovieCard = lazy(() => import("./MovieCard"));

interface MoviesTypes {
  id: number,
  name: string,
  posterPath: string,
  movieAverange: number,
  movieDate: string,
  movieStatus: string
} 

interface IMoviesItemProps {
  name: string;
  posterPath: string;
  date: string;
}

interface IMoviesProps {
  item: MoviesTypes
}

interface MovieListProps {
  handleSelectMovie: (item: MoviesTypes) => void;
  movies: MoviesTypes[];
  movieSelected: MoviesTypes;
}

export function MovieList({
  movies,
  handleSelectMovie,
  movieSelected
}: MovieListProps) {
  const TOTAL_OF_PAGE_NUMBER = movies.length / 10;

  const [pages, setPages] = useState(1);
  const [moviesState, setMoviesState] = useState<MoviesTypes[]>([]);

  useEffect(() => {
    if (movies.length > 10) {
      let moviesFiltered: MoviesTypes[] = [];

      for (let index = 0; index < 10; index++) {
        moviesFiltered.push(movies[index]);
      }

      setMoviesState(moviesFiltered);
      return;
    }

    setMoviesState(movies);
  }, [movies]);

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

  const renderItem = ({ item }: IMoviesProps) => {
    return (
      <Suspense fallback={
        <Text style={{color: theme.colors.text}}>Carregando...</Text>
      }>
        <MovieCard
          selected={movieSelected.id === item.id}
          handleSelectMovie={handleSelectMovie}
          item={{
            id: item.id,
            movieAverange: item.movieAverange,
            movieStatus: item.movieStatus,
            movieDate: item.movieDate,
            name: item.name,
            posterPath: item.posterPath
          }}
        />
      </Suspense>
    )
  };

  return (
    <FlatList
      data={moviesState}
      renderItem={renderItem}
      removeClippedSubviews={true}
      maxToRenderPerBatch={2}
      initialNumToRender={2}
      onEndReached={onEnd}
      style={styles.list}
      ListHeaderComponent={
        <FastImage 
          style={styles.TMDBLogo}
          source={require("../../assets/tmdb-logo.png")}
        />
      }
    /> 
  )
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  TMDBLogo: {
    width: 115,
    height: 15,
    marginVertical: 8
  },
})

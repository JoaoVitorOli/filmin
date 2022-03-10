import React, { lazy, Suspense, useEffect, useState } from "react";
import { 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableHighlight, 
  View
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { movies } from "../../data/movies2";
import { theme } from "../../styles/theme";

const MovieCard = lazy(() => import("./MovieCard"));

interface MoviesTypes {
  id: number,
  name: string,
  posterPath: string,
  averange: string,
  date: string,
  isChecked: boolean
} 

interface MovieListProps {
  movies: MoviesTypes[]
}

interface IMoviesItemProps {
  name: string;
  posterPath: string;
  date: string;
}

interface IMoviesProps {
  item: IMoviesItemProps
}

const renderItem = ({ item }: IMoviesProps) => {
  return (
    <Suspense fallback={
      <Text style={{color: theme.colors.text}}>Carregando...</Text>
    }>
      <MovieCard
        item={{
          date: item.date,
          name: item.name,
          posterPath: item.posterPath
        }}
      />
    </Suspense>
  )
};

export function MovieList({
  movies
}: MovieListProps) {

  console.log(movies[0]);

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

  return (
    <FlatList
      data={moviesState}
      renderItem={renderItem}
      removeClippedSubviews={true}
      maxToRenderPerBatch={2}
      initialNumToRender={2}
      onEndReached={onEnd}
      style={styles.list}
      // ListFooterComponent={
      //   <View style={{
      //     height: 30
      //   }} />
      // }
      // ListHeaderComponent={
      //   <View style={{
      //     height: 6
      //   }} />
      // }
    /> 
  )
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%",
  }
})

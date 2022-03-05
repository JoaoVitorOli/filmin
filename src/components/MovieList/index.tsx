import React, { 
  lazy, 
  Suspense, 
  useState
} from "react";
import { 
  View, 
  Text, 
  FlatList, 
} from "react-native";

import { movies } from "../../data/movies";
import { styles } from "./styles";

const MovieCard = lazy(() => import("./MovieCard"));

interface IMoviesProps {
  item: IMoviesItemProps
}

interface IMoviesItemProps {
  id: number;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  isChecked: boolean;
}

const renderItem = ({ item }: IMoviesProps) => {
  return (
    <Suspense fallback={
      <Text>Carregando...</Text>
    }>
      <MovieCard
        item={item}
      />
    </Suspense>
  )
};

export const MovieList = () => {
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
      />
    </View>
  );
}


import { Model } from "@nozbe/watermelondb";
import withObservables from "@nozbe/with-observables";
import React, { memo, useEffect } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FastImage from 'react-native-fast-image';
import { AirbnbRating } from "react-native-ratings";
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteTask, toggleCheckMovie } from "../../../db/services/Movie";
import { IMoviesWatched, IMoviesWatchedState } from "../../../store";
import { setMoviesWatched } from "../../../store/modules/moviesWatched/actions";

import { theme } from "../../../styles/theme";

import { styles } from "./styles";

interface ItemsProps extends Model {
  id: string;
  name: string;
  posterPath: string;
  movieAverange: string;
  movieDate: string;
  movieStatus: string;
}

interface IMoviesProps {
  movies: ItemsProps
}

function Component({ movies }: IMoviesProps) {
  const dispatch = useDispatch();

  const moviesWatched = useSelector<IMoviesWatchedState, number>(state => {
    return state.moviesWatched.count;
  });

  useEffect(() => {
    if (movies.movieStatus === "false") {
      dispatch(setMoviesWatched(moviesWatched - 1));
    } else {
      dispatch(setMoviesWatched(moviesWatched + 1));
    }
  }, []);

  function handleCheckMovie() {
    toggleCheckMovie(
      movies.id, 
      movies.movieStatus === "false" ? "true" : "false"
    );

    if (movies.movieStatus === "false") {
      dispatch(setMoviesWatched(moviesWatched + 1));
    } else {
      dispatch(setMoviesWatched(moviesWatched - 1));
    }
  }

  return (
    <View style={styles.card}>
      <BouncyCheckbox
        size={20}
        fillColor={theme.colors.purple}
        unfillColor="transparent"
        iconStyle={{ 
          borderColor: movies.movieStatus === "true" ? theme.colors.purple : theme.colors.gray,
          borderRadius: 6,
          borderWidth: 2
        }}
        isChecked={movies.movieStatus === "true"}
        onPress={() => {handleCheckMovie()}}
      />
      <FastImage
        style={styles.image}
        source={movies.posterPath ? {
          uri: `https://image.tmdb.org/t/p/w200/${movies.posterPath}`,
          priority: FastImage.priority.low,
        } : require("../../../assets/image-empty.png")}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.middle}>
        <Text style={styles.title}>{movies.name}</Text>
        <Text style={styles.date}>
          {
            movies.movieDate && movies.movieDate
          }
        </Text>
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={Number(movies.movieAverange) / 2}
          size={10}
          isDisabled
          reviewSize={1}
          starContainerStyle={{
            marginLeft: 0,
            marginTop: 8
          }}
          ratingContainerStyle={{
            marginRight: "auto",
          }}
        />
      </View>

      <TouchableHighlight
        style={styles.buttonExcludeMovie}
        onPress={() => handleDeleteTask(movies.id)}
        activeOpacity={0.5}
        underlayColor="#dddddd10"
      >
        <IconAntDesign 
          name="close"
          size={20}
          color={"#D2D2D2"}
        />
      </TouchableHighlight>
    </View>
  );
}

export const MovieCard = withObservables(['movies'], ({ movies }) => ({
  movies,
}))(Component);

export default memo(MovieCard, (prevProps, nextProps) => {
  return Object.is(prevProps.movies, nextProps.movies);
});

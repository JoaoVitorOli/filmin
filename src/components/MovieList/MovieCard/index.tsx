import { Model } from "@nozbe/watermelondb";
import withObservables from "@nozbe/with-observables";
import React, { memo, useRef } from "react";
import { Animated, Text, TouchableHighlight, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FastImage from 'react-native-fast-image';
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';
import { default as IconFeather } from 'react-native-vector-icons/Feather';
import { useSetRecoilState } from "recoil";

import { handleDeleteMovie, toggleCheckMovie } from "../../../db/services/Movie";
import { moviesWatchedState } from "../../../recoil/watchedMovies";

import { theme } from "../../../styles/theme";
import { MovieRating } from "./MovieRating";

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
  const setWatchedMovies = useSetRecoilState(moviesWatchedState);
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const positionAnimation = useRef(new Animated.Value(0)).current;

  function handleCheckMovie() {
    toggleCheckMovie(
      movies.id, 
      movies.movieStatus === "false" ? "true" : "false"
    );

    if (movies.movieStatus === "false") {
      setWatchedMovies((state) => state + 1);
    } else {
      setWatchedMovies((state) => state - 1);
    }
  }

  function handleDeleteMovieWithAnimation() {
    setTimeout(() => {
      handleDeleteMovie(movies.id);

      if (movies.movieStatus === "true") {
        setWatchedMovies(state => state - 1);
      }
    }, 300);

    Animated.timing(
      fadeAnimation,
      {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }
    ).start();

    Animated.timing(
      positionAnimation,
      {
        toValue: -300,
        duration: 350,
        useNativeDriver: true,
      }
    ).start();
  }

  return (
    <Animated.View style={{
      ...styles.card,
      backgroundColor: movies.movieStatus === "false" 
        ? theme.colors.shape 
        : theme.colors.purpleTransparent,
      opacity: fadeAnimation,
      transform: [{translateX: positionAnimation}]
    }}>
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
        style={{
          ...styles.image,
          opacity: movies.movieStatus === "false" 
            ? 1
            : 0.3,
        }}
        source={movies.posterPath ? {
          uri: `https://image.tmdb.org/t/p/w200/${movies.posterPath}`,
          priority: FastImage.priority.low,
        } : require("../../../assets/image-empty.png")}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={{
        ...styles.middle,
        opacity: movies.movieStatus === "false" 
            ? 1
            : 0.3,
      }}>
        <Text style={styles.title}>{movies.name}</Text>
        <Text style={styles.date}>
          {
            movies.movieDate && new Date(movies.movieDate).getFullYear()
          }
        </Text>
        <MovieRating rating={Number(movies.movieAverange)} />
      </View>

      <TouchableHighlight
        style={styles.buttonExcludeMovie}
        onPress={() => handleDeleteMovieWithAnimation()}
        activeOpacity={0.5}
        underlayColor="#dddddd10"
      >
        {movies.movieStatus === "true" ? (
          <IconFeather 
            name="trash"
            size={20}
            color={theme.colors.danger}
          />
        ) : (
          <IconAntDesign 
            name="close"
            size={20}
            color={"#D2D2D2"}
          />
        )}
      </TouchableHighlight>
    </Animated.View>
  );
}

export const MovieCard = withObservables(['movies'], ({ movies }) => ({
  movies,
}))(Component);

export default memo(MovieCard, (prevProps, nextProps) => {
  return Object.is(prevProps.movies, nextProps.movies);
});

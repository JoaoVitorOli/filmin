import { Model } from "@nozbe/watermelondb";
import withObservables from "@nozbe/with-observables";
import React, { memo, useEffect, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FastImage from 'react-native-fast-image';
import { AirbnbRating } from "react-native-ratings";
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';
import { database } from "../../../db/index.native";
import Movie from "../../../db/model/Movie";
import { handleDeleteTask, toggleCheckMovie } from "../../../db/services/Movie";

import { theme } from "../../../styles/theme";

import { styles } from "./styles";

interface ItemsProps extends Model {
  id: string;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  status: boolean;
}

interface IMoviesProps {
  movies: ItemsProps
}

function Component({ movies }: IMoviesProps) {
  const [check] = useState(movies.status);
  // console.log(movies);

  return (
    <View style={styles.card}>
      <BouncyCheckbox
        size={20}
        fillColor={theme.colors.purple}
        unfillColor="transparent"
        iconStyle={{ 
          borderColor: check ? theme.colors.purple : theme.colors.gray,
          borderRadius: 6,
          borderWidth: 2
        }}
        isChecked={check}
        onPress={() => {toggleCheckMovie(movies.id, !check)}}
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
            movies.date && new Date(movies.date).getFullYear()
          }
        </Text>
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={8 / 2}
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

// export default function MemoMovieCard() { memo(MovieCard, (prevProps, nextProps) => {
//   return Object.is(prevProps.item, nextProps.item);
// })};

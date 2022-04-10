import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { styles } from "./styles";

interface MovieProps {
  id: number;
  name: string;
  posterPath: string;
  movieAverange: number;
  movieDate: string;
  movieStatus: string;
}

interface MovieCardProps {
  item: MovieProps;
  selected: boolean;
  handleSelectMovie: (item: MovieProps) => void,
}

function MovieCard({ item, selected, handleSelectMovie }: MovieCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, selected && styles.selected]}
      activeOpacity={0.8}
      onPress={() => handleSelectMovie(item)}
    >
      <FastImage
        style={styles.image}
        source={item.posterPath ? {
          uri: `https://image.tmdb.org/t/p/w200/${item.posterPath}`,
          priority: FastImage.priority.low,
        } : require("../../../assets/image-empty.png")}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.middle}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.date}>
          {
            item.movieDate && new Date(item.movieDate).getFullYear()
          }
        </Text>
      </View>
    </TouchableOpacity> 
  )
}

export default memo(MovieCard, (prevProps, nextProps) => {
  return Object.is(prevProps.item, nextProps.item);
});

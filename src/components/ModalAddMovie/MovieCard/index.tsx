import React, { memo, useEffect } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Icon from 'react-native-vector-icons/AntDesign';

import { styles } from "./styles";

interface MovieProps {
  id: number;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  checkStatus: number;
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
            item.date && new Date(item.date).getFullYear()
          }
        </Text>
      </View>
    </TouchableOpacity> 
  )
}

export default memo(MovieCard, (prevProps, nextProps) => {
  return Object.is(prevProps.item, nextProps.item);
});

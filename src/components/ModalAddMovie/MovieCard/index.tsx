import React, { memo } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import FastImage from "react-native-fast-image";
import Icon from 'react-native-vector-icons/AntDesign';

import { styles } from "./styles";

interface MovieCardProps {
  item: {
    name: string;
    posterPath: string;
    date: string;
  }
}

function MovieCard({ item }: MovieCardProps) {
  console.log(item);

  return (
    <View style={styles.card}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.posterPath 
            ? `https://image.tmdb.org/t/p/w200/${item.posterPath}`
            : "https://avatars.githubusercontent.com/u/56055282?v=4",
          priority: FastImage.priority.low,
        }}
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
    </View> 
  )
}

export default memo(MovieCard);

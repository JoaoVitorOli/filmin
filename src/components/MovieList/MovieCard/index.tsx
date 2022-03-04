import CheckBox from "@react-native-community/checkbox";
import React, { memo, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';

import { styles } from "./styles";

interface IMoviesProps {
  item: {
    id: number;
    name: string;
    posterPath: string;
    averange: number;
    date: string;
    isChecked: boolean;
  }
}

function MovieCard({ item }: IMoviesProps) {
  const [checkBox, setCheckBox] = useState(item.isChecked)

  return (
    <View style={styles.card}>
      <CheckBox 
        value={checkBox}
        onValueChange={() => {setCheckBox(!checkBox)}}
        style={styles.checkbox}
      />
      <FastImage
        style={styles.image}
        source={{
          uri: item.posterPath 
            ? item.posterPath 
            : "https://avatars.githubusercontent.com/u/56055282?v=4",
          headers: { Authorization: 'someAuthToken' },
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
        {/* <Text style={styles.text}>{item.averange}</Text> */}
      </View>

      <TouchableHighlight
        style={styles.buttonExcludeMovie}
        onPress={() => {}}
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

export default memo(MovieCard);

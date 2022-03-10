import React, { memo, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FastImage from 'react-native-fast-image';
import { AirbnbRating } from "react-native-ratings";
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';

import { theme } from "../../../styles/theme";

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
  const [checkBoxValue, setCheckBoxValue] = useState(item.isChecked);

  return (
    <View style={styles.card}>
      <BouncyCheckbox
        size={20}
        fillColor={theme.colors.purple}
        unfillColor="transparent"
        iconStyle={{ 
          borderColor: checkBoxValue ? theme.colors.purple : theme.colors.gray,
          borderRadius: 6,
          borderWidth: 2
        }}
        isChecked={checkBoxValue}
        onPress={() => {setCheckBoxValue(!checkBoxValue)}}
      />
      <FastImage
        style={styles.image}
        source={{
          uri: item.posterPath 
            ? item.posterPath 
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

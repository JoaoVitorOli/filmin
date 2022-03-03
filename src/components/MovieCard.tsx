import CheckBox from "@react-native-community/checkbox";
import React, { memo, PropsWithChildren, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";

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

type typeTest = {
  prevItem: Readonly<PropsWithChildren<IMoviesProps>>,
  nextItem: Readonly<PropsWithChildren<IMoviesProps>>
}

function MovieCard({item}: IMoviesProps) {
  const [checkBox, setCheckBox] = useState(item.isChecked)

  return (
    <View style={styles.card}>
      <CheckBox 
        value={checkBox}
        onValueChange={() => {setCheckBox(!checkBox)}}
      />
      <Image
        source={item.posterPath ? { uri: item.posterPath } : { uri: "https://avatars.githubusercontent.com/u/56055282?v=4" } }
        width={80}
        height={80}
      />
      <View>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.date}</Text>
        <Text style={styles.text}>{item.averange}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text
  },

  card: {
    backgroundColor: theme.colors.shape,
    marginBottom: 10
  }
});

export default memo(MovieCard);

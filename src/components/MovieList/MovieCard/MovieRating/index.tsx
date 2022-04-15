import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Tooltip from "react-native-walkthrough-tooltip";
import { theme } from "../../../../styles/theme";

interface MovieRatingProps {
  rating: number;
}

export function MovieRating({ rating }: MovieRatingProps) {
  const [isTooltipShowing, setIsTooltipShowing] = useState(false);
  
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => setIsTooltipShowing(state => !state)}
    >
      <Tooltip
        disableShadow
        isVisible={isTooltipShowing}
        backgroundColor={"transparent"}
        backgroundStyle={{
          backgroundColor: theme.colors.purple
        }}
        content={
          <Text style={styles.textTooltip}>
            {rating}
          </Text>
        }
        placement="right"
        onClose={() => setIsTooltipShowing(false)}
      >
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={rating / 2}
          size={10}
          isDisabled
          reviewSize={1}
          starContainerStyle={{
            marginLeft: 0,
          }}
        />
      </Tooltip>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: "auto",
    marginTop: 8,
  },

  textTooltip: {
    color: theme.colors.text,
    fontFamily: "nunito_bold",
    fontSize: 12
  },
});

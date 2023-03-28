import React from 'react';
import { View, TouchableOpacity, Animated } from "react-native";
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { styles } from './styles';
import { theme } from '../../styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function CustomTab({ 
  state, 
  descriptors, 
  navigation, 
}: MaterialTopTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // @ts-ignore
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const colorLogic = () => {
          return isFocused ? theme.colors.purple : theme.colors.text;
        }
        

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
          >
            <View style={styles.iconAndText}>
              {label === 'Filmes' ? (
                <MaterialCommunityIcons 
                  name="movie"
                  size={20}
                  color={colorLogic()}
                />
              ) : (
                <MaterialCommunityIcons 
                  name="gamepad-variant"
                  size={22}
                  color={colorLogic()}
                />
              )}

              <Animated.Text 
                style={{
                  ...styles.text,
                  color: colorLogic(),
                }}
              >
                {label}
              </Animated.Text>
            </View>

            <View 
              style={{
                width: isFocused ? 50 : 0,
                height: 3,
                backgroundColor: colorLogic(),
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
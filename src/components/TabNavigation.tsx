import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomTab } from './CustomTab';
import MovieList from './MovieList';
import { navigationContainerTheme } from '../styles/navigationContainerTheme';
import { Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export function TabNavigation() {
  return (
    <NavigationContainer theme={navigationContainerTheme}>
      <Tab.Navigator
        initialRouteName="MovieList"
        tabBar={props => <CustomTab {...props} />}
        initialLayout={{
          height: Dimensions.get('window').height
        }}
      >
        <Tab.Screen 
          name="MovieList" 
          component={MovieList} 
          options={{ tabBarLabel: 'Filmes' }}
        />
        <Tab.Screen 
          name="GameList" 
          component={MovieList} 
          options={{ tabBarLabel: 'Games' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

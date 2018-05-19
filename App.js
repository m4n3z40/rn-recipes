import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Home from './screens/home/Home';
import Recipe from './screens/recipe/Recipe';

export default createStackNavigator({
  Home: {
    screen: Home
  },
  Recipe: {
    screen: Recipe
  }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

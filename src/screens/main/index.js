import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './home/Home';
import Recipe from './recipe/Recipe';
import Instructions from './instructions/Instructions';

const MainStack = createStackNavigator({
  Home,
  Recipe,
  Instructions,
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

MainStack.navigationOptions = {
  title: 'Recipes',
  tabBarIcon: ({ tintColor }) =>
    <MaterialCommunityIcons name="food-fork-drink" size={25} color={tintColor} />,
};

export default MainStack;

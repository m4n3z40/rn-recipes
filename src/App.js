import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import MainStack from './screens/main';
import FavoritesStack from './screens/favorites';
import Recipe from './screens/main/recipe/Recipe';

const MainTabs = createBottomTabNavigator({
  Main: MainStack,
  Favorites: FavoritesStack,
}, {
  initialRouteName: 'Main',
  navigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default class App extends Component {
  state = {
    favorites: new Map(),
  };

  toggleFavorite = recipe => {
    const { favorites: oldFavorites } = this.state;

    if (oldFavorites.has(recipe.recipe_id)) {
      oldFavorites.delete(recipe.recipe_id, recipe);

      this.setState({
        favorites: new Map(oldFavorites),
      });
    } else {
      this.setState({
        favorites: new Map(oldFavorites.set(recipe.recipe_id, recipe)),
      });
    }
  };

  render() {
    return (
      <MainTabs
        screenProps={{
          state: this.state,
          toggleFavorite: this.toggleFavorite
        }}
      />
    );
  }
};

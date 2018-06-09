import React from 'react';
import { createStackNavigator, Header } from 'react-navigation';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RecipeList from '../../components/RecipeList';

const Favorites = ({ screenProps: { state }, navigation }) => (
  <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
    <RecipeList
      noRecipesText="No favorites yet"
      recipes={Array.from(state.favorites.values())}
      onSelectRecipe={recipe => navigation.navigate('Recipe', recipe)}
    />
  </View>
);

const FavoritesStack = createStackNavigator({
  Favorites,
}, {
  navigationOptions: {
    title: 'Favorites',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

FavoritesStack.navigationOptions = {
  title: 'Favotites',
  tabBarIcon({ tintColor }) {
    return <MaterialIcons name="favorite" size={25} color={tintColor} />;
  }
};

export default FavoritesStack;

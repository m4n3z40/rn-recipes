import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RecipeList from '../../components/RecipeList';

const Favorites = ({ favorites, navigation }) => (
  <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
    <RecipeList
      noRecipesText="No favorites yet"
      recipes={Array.from(favorites.values())}
      onSelectRecipe={recipe => navigation.navigate('Recipe', recipe)}
    />
  </View>
);

const mapStateToProps = ({ favorites }) => ({
  favorites: favorites.favorites,
});

const FavoritesStack = createStackNavigator({
  Favorites: connect(mapStateToProps)(Favorites),
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
  tabBarIcon: ({ tintColor }) =>
    <MaterialIcons name="favorite" size={25} color={tintColor} />,
};

export default FavoritesStack;

import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import RecipeItem from './RecipeItem';

export default class RecipeList extends Component {
  static defaultProps = {
    noRecipesText: 'No recipes found.',
  };

  renderItem = ({ item }) => <RecipeItem recipe={item} onSelect={this.props.onSelectRecipe}/>;

  render() {
    const { recipes, noRecipesText } = this.props;

    if (recipes.length === 0) {
      return <Text>{noRecipesText}</Text>
    }

    return (
      <FlatList
        style={{width: '100%'}}
        data={recipes}
        keyExtractor={recipe => recipe.recipe_id}
        renderItem={this.renderItem}
      />
    );
  }
}

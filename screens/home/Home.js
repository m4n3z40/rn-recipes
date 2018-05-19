import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { food2ForkKey } from '../../config';
import RecipeItem from './RecipeItem';

const fetchRecipes = async q => {
  const res = await fetch(`https://food2fork.com/api/search?key=${food2ForkKey}&q=${q}`);

  const {recipes} = await res.json();

  return recipes;
};

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    query: '',
    recipes: [],
    loading: false,
  };

  handleSearchChange = query => {
    this.setState({query});
  };

  handleSearchSubmit = async () => {
    this.setState({loading: true});

    const recipes = await fetchRecipes(this.state.query);

    this.setState({loading: false, recipes});
  };

  handleSelect = item => {
    this.props.navigation.navigate('Recipe', item);
  };

  renderItem = ({item}) => <RecipeItem recipe={item} onSelect={this.handleSelect}/>;

  renderResults = () => {
    const { recipes } = this.state;

    if (recipes.length === 0) {
      return <Text>No recipes found.</Text>
    }

    return (
      <FlatList
        style={{width: '100%'}}
        data={this.state.recipes}
        keyExtractor={recipe => recipe.recipe_id}
        renderItem={this.renderItem}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search recipes:</Text>
          <TextInput
            style={styles.searchInput}
            onChangeText={this.handleSearchChange}
            onSubmitEditing={this.handleSearchSubmit}
            returnKeyType="search"
          />
        </View>
        <View style={styles.resultsContainer}>
          {
            this.state.loading
              ? <ActivityIndicator size="large" color="#000"/>
              : this.renderResults()
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 10,
    paddingEnd: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  headerTitle: {
    fontWeight: 'bold'
  },
  searchInput: {
    marginTop: 10,
    borderRadius: 6,
    borderWidth: 1,
    paddingTop: 5,
    paddingEnd: 10,
    paddingBottom: 5,
    paddingStart: 10,
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { loadRecipes } from '../../../store/recipes';
import RecipeList from '../../../components/RecipeList';

export class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = { query: '' };

  handleSearchChange = query => {
    this.setState({ query });
  };

  handleSearchSubmit = () => {
    this.props.loadRecipes(this.state.query);
  };

  handleSelect = item => {
    this.props.navigation.navigate('Recipe', item);
  };

  renderResults = () => {
    const { recipes } = this.props;

    return <RecipeList recipes={recipes} onSelectRecipe={this.handleSelect} />;
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
            this.props.loading
              ? <ActivityIndicator size="large" color="#000"/>
              : this.renderResults()
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({
  recipes: recipes.recipes,
  loading: recipes.loading,
});

const mapDispatchToProps = { loadRecipes };

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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

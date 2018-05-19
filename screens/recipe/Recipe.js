import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Button,
  Linking,
  StyleSheet,
} from 'react-native';
import { food2ForkKey } from '../../config';
import { safeUrl, getImageSrc } from '../../utils';
import RecipeIngredient from './RecipeIngredient';

const fetchFullRecipe = async recipeId => {
  const res = await fetch(`https://food2fork.com/api/get?key=${food2ForkKey}&rId=${recipeId}`);

  const {recipe} = await res.json();

  return recipe;
};

const getIngredients = fullRecipe => fullRecipe.ingredients.map((ingredient, index) => ({
  key: String(index + 1),
  description: ingredient,
}));

export default class Recipe extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;

    return {title};
  };

  state = {
    fullRecipe: null,
  };

  async componentDidMount() {
    const {recipe_id} = this.props.navigation.state.params;

    const fullRecipe = await fetchFullRecipe(recipe_id);

    this.setState({fullRecipe});
  }

  handleSeeInstructions = async () => {
    const {source_url} = this.props.navigation.state.params;

    await Linking.openURL(safeUrl(source_url));
  };

  renderItem = ({item}) => <RecipeIngredient ingredient={item}/>;

  render() {
    const {params: recipe} = this.props.navigation.state;
    const {fullRecipe} = this.state;

    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.headerImage}
          source={getImageSrc(recipe)}
        />
        <View style={styles.content}>
          <View style={styles.contentTitle}>
            <Text>
              Score:
              <Text style={styles.strongText}>
                {' '}{Math.round(recipe.social_rank)}%
              </Text>
            </Text>
            <Text>
              Publisher:
              <Text style={styles.strongText}>
                {' '}{recipe.publisher}
              </Text>
            </Text>
          </View>
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionTitle}>
              Ingredients
            </Text>
            <View>
              {
                !fullRecipe
                  ? <ActivityIndicator style={styles.sectionSpacing} size="large" color="#000"/>
                  : (
                    <FlatList
                      style={{width: '100%'}}
                      data={getIngredients(fullRecipe)}
                      renderItem={this.renderItem}
                    />
                  )
              }
            </View>
          </View>
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Button onPress={this.handleSeeInstructions} title="See Instructions"/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 280,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 10,
    paddingEnd: 10,
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strongText: {
    fontWeight: 'bold',
  },
  sectionSpacing: {
    marginTop: 20,
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

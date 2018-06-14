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
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { loadFullRecipe } from '../../../store/recipes';
import { toggleFavorite } from '../../../store/favorites';
import { safeUrl, getImageSrc } from '../../../utils';
import RecipeIngredient from './RecipeIngredient';

const getIngredients = fullRecipe => fullRecipe.ingredients.map((ingredient, index) => ({
  key: String(index + 1),
  description: ingredient,
}));

export class Recipe extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;

    return {title};
  };

  componentDidMount() {
    const { recipe_id } = this.props.navigation.state.params;

    this.props.loadFullRecipe(recipe_id);
  }

  handleSeeInstructions = async () => {
    const { source_url } = this.props.navigation.state.params;

    await Linking.openURL(safeUrl(source_url));
  };

  renderItem = ({item}) => <RecipeIngredient ingredient={item}/>;

  render() {
    const { params: recipe } = this.props.navigation.state;
    const { fullRecipe, favorites, toggleFavorite } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.headerImage}
          source={getImageSrc(recipe)}
        />
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text>
                  Score:
                </Text>
                <Text style={styles.strongText}>
                  {' '}{Math.round(recipe.social_rank)}%
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text>
                  Publisher:
                </Text>
                <Text style={styles.strongText}>
                  {' '}{recipe.publisher}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => toggleFavorite(recipe)}>
                <MaterialIcons
                  name={favorites.has(recipe.recipe_id) ? 'favorite' : 'favorite-border'}
                  size={34}
                  color="#f00"
                  style={{ opacity: favorites.has(recipe.recipe_id) ? 1 : 0.6 }}
                />
              </TouchableOpacity>
            </View>
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

const mapStateToProps = ({ recipes, favorites }) => ({
  fullRecipe: recipes.fullRecipe,
  favorites: favorites.favorites,
});

const mapDispatchToProps = { loadFullRecipe, toggleFavorite };

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);

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
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

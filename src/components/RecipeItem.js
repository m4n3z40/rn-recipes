import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { getImageSrc } from '../utils/url';

export default function RecipeItem({recipe, onSelect}) {
  return (
    <TouchableOpacity onPress={() => onSelect(recipe)}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={getImageSrc(recipe)}
        />
        <View style={styles.content}>
          <Text style={styles.contentTitle} numberOfLines={1}>
            {recipe.title}
          </Text>
          <View style={styles.contentScore}>
            <Text>
              Score:
              <Text style={{fontWeight: 'bold'}}>
                {' '}{Math.round(recipe.social_rank)}%
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  contentScore: {
    marginTop: 5,
  }
});

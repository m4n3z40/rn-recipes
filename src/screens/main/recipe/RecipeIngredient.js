import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecipeIngredient({ingredient}) {
  return (
    <View style={styles.container}>
      <Text style={styles.bullet}>
        {'\u2022'}
      </Text>
      <Text style={styles.description}> {ingredient.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  bullet: {
    fontWeight: 'bold',
    fontSize: 15
  },
  description: {
    fontWeight: 'normal'
  }
});

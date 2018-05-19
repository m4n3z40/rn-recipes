import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecipeIngredient({ingredient}) {
  return (
    <View style={styles.container}>
      <Text style={styles.bullet}>
        {'\u2022'}
        <Text style={styles.description}> {ingredient.description}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  bullet: {
    fontWeight: 'bold',
    fontSize: 15
  },
  description: {
    fontWeight: 'normal'
  }
});

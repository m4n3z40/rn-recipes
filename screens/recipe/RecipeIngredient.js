import React from 'react';
import { View, Text } from 'react-native';

export default function RecipeIngredient({ingredient}) {
  return (
    <View style={{ paddingTop: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
        {'\u2022'}
        <Text style={{ fontWeight: 'normal' }}> {ingredient.description}</Text>
      </Text>
    </View>
  );
}

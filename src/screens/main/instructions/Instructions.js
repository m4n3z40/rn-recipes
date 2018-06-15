import React from 'react';
import WebView from '../../../components/WebView';

const Instructions = ({ navigation: { state } }) =>
  <WebView src={state.params.src} style={{ flex: 1 }} />;

Instructions.navigationOptions = ({ navigation }) => {
  const { title } = navigation.state.params;

  return { title: `Instructions: ${title}` };
};

export default Instructions;

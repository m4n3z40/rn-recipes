import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import MainStack from './screens/main';
import FavoritesStack from './screens/favorites';

const MainTabs = createBottomTabNavigator({
  Main: MainStack,
  Favorites: FavoritesStack,
}, {
  initialRouteName: 'Main',
  navigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <MainTabs />
  </Provider>
);

export default App;

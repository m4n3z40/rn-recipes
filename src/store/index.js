import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import recipesReducer from './recipes';
import favoritesReducer from './favorites';

// const rootReducer = (state, action) => ({
//   recipes: recipesReducer(state.recipes, action),
//   favorites: favoritesReducer(state.favorites, action),
// });

const rootReducer = combineReducers({
  recipes: recipesReducer,
  favorites: favoritesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

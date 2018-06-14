import toast from '../utils/toast';

const TOGGLE_FAVORITE = 'favorites/TOGGLE_FAVORITE';

export const toggleFavorite = recipe =>
  (dispatch, getState) => {
    dispatch({ type: TOGGLE_FAVORITE, recipe });

    const { favorites: { favorites } } = getState();

    if (favorites.has(recipe.recipe_id)) {
      toast.show('Added to favorites');
    } else {
      toast.show('Removed from favorites');
    }
  };

const initialState = {
  favorites: new Map(),
};

export default function favoritesReducer(state = initialState, action) {
  if (action.type === TOGGLE_FAVORITE) {
    const oldFavorites = state.favorites;
    const { recipe } = action;

    if (oldFavorites.has(recipe.recipe_id)) {
      oldFavorites.delete(recipe.recipe_id);
    } else {
      oldFavorites.set(recipe.recipe_id, recipe)
    }

    return { favorites: new Map(oldFavorites) };
  }

  return state;
}

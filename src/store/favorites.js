import toast from '../utils/toast';

const TOGGLE_FAVORITE = 'favorites/TOGGLE_FAVORITE';

export const toggleFavorite = recipe => ({
  type: TOGGLE_FAVORITE,
  recipe,
});

const initialState = {
  favorites: new Map(),
};

export default function favoritesReducer(state = initialState, action) {
  if (action.type === TOGGLE_FAVORITE) {
    const oldFavorites = state.favorites;
    const { recipe } = action;

    if (oldFavorites.has(recipe.recipe_id)) {
      toast.show('Removed from favorites');

      oldFavorites.delete(recipe.recipe_id);
    } else {
      toast.show('Added to favorites');

      oldFavorites.set(recipe.recipe_id, recipe)
    }

    return { favorites: new Map(oldFavorites) };
  }

  return state;
}

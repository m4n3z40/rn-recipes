const TOGGLE_FAVORITE = Symbol('favorites/TOGGLE_FAVORITE');

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
      oldFavorites.delete(recipe.recipe_id);
    } else {
      oldFavorites.set(recipe.recipe_id, recipe)
    }

    return { favorites: new Map(oldFavorites) };
  }

  return state;
}

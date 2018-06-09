import { food2ForkKey } from "../config";

const FETCH_RECIPES_START = Symbol('recipes/FETCH_RECIPES_START');
const FETCH_RECIPES_END = Symbol('recipes/FETCH_RECIPES_END');
const FETCH_FULL_RECIPE_START = Symbol('recipes/FETCH_FULL_RECIPE_START');
const FETCH_FULL_RECIPE_END = Symbol('recipes/FETCH_FULL_RECIPE_END');

const fetchRecipes = async q => {
  const res = await fetch(`https://food2fork.com/api/search?key=${food2ForkKey}&q=${q}`);

  const { recipes } = await res.json();

  return recipes;
};

const fetchFullRecipe = async recipeId => {
  const res = await fetch(`https://food2fork.com/api/get?key=${food2ForkKey}&rId=${recipeId}`);

  const { recipe } = await res.json();

  return recipe;
};

export const loadRecipes = q => async dispatch => {
  dispatch({ type: FETCH_RECIPES_START });

  const recipes = await fetchRecipes(q);

  dispatch({ type: FETCH_RECIPES_END, recipes });
};

export const loadFullRecipe = id => async dispatch => {
  dispatch({ type: FETCH_FULL_RECIPE_START });

  const recipe = await fetchFullRecipe(id);

  dispatch({ type: FETCH_FULL_RECIPE_END, recipe });
};

const initialState = {
  loading: false,
  recipes: [],
  fullRecipe: null,
};

export default function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPES_START:
      return { ...state, loading: true };
    case FETCH_RECIPES_END:
      return { ...state, loading: false, recipes: action.recipes };
    case FETCH_FULL_RECIPE_START:
      return { ...state, fullRecipe: null };
    case FETCH_FULL_RECIPE_END:
      return { ...state, fullRecipe: action.recipe };
  }

  return state;
}

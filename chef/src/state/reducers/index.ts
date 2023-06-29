import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer";
import recipeReducer from "./recipeReducer";

const reducers = combineReducers({
  results: recipesReducer,
  recipe: recipeReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

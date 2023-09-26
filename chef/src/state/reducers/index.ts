import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer";
import recipeReducer from "./recipeReducer";
import tagsReducer from "./tagsReducer";

const reducers = combineReducers({
  results: recipesReducer,
  recipe: recipeReducer,
  tags: tagsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

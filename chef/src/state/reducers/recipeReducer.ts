import { RecipeActionType } from "../action-types";
import { RecipeInfo, RecipeAction } from "../actions";

interface RecipeState {
  loading: boolean;
  error: string | null;
  recipeInfo: RecipeInfo | null;
}

const initialState = {
  loading: false,
  error: null,
  recipeInfo: null,
};

const recipeReducer = (
  state: RecipeState = initialState,
  action: RecipeAction
): RecipeState => {
  switch (action.type) {
    case RecipeActionType.REQUEST_RECIPE_API:
      return { loading: true, error: null, recipeInfo: null };
    case RecipeActionType.REQUEST_RECIPE_API_SUCCESS:
      return { loading: false, error: null, recipeInfo: action.payload };
    case RecipeActionType.REQUEST_RECIPE_API_ERROR:
      return { loading: false, error: action.payload, recipeInfo: null };
    case RecipeActionType.REQUEST_UPDATE_RECIPE_API:
      return { loading: true, error: null, recipeInfo: null };
    case RecipeActionType.REQUEST_UPDATE_RECIPE_API_SUCCESS:
      return { loading: false, error: null, recipeInfo: action.payload };
    case RecipeActionType.REQUEST_UPDATE_RECIPE_API_ERROR:
      return { loading: false, error: action.payload, recipeInfo: null };
    default:
      return state;
  }
};

export default recipeReducer;

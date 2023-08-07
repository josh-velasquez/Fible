import { RecipeActionType } from "../action-types";
import { RecipeInfo, RecipeAction } from "../actions";

interface RecipeState {
  loading: boolean;
  error: string | null;
  data: RecipeInfo | null;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const recipeReducer = (
  state: RecipeState = initialState,
  action: RecipeAction
): RecipeState => {
  switch (action.type) {
    case RecipeActionType.REQUEST_RECIPE_API:
      return { loading: true, error: null, data: null };
    case RecipeActionType.REQUEST_RECIPE_API_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case RecipeActionType.REQUEST_RECIPE_API_ERROR:
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

export default recipeReducer;

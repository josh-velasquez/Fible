import { ActionType } from "../action-types";
import { Recipe, RecipeAction } from "../actions";

interface RecipeState {
  loading: boolean;
  error: string | null;
  data: Recipe | null;
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
    case ActionType.REQUEST_API:
      return { loading: true, error: null, data: null };
    case ActionType.REQUEST_API_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.REQUEST_API_ERROR:
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

export default recipeReducer;

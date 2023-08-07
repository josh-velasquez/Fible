import { ActionType } from "../action-types";
import { RecipesAction, RecipesData } from "../actions";

interface RecipesState {
  loading: boolean;
  error: string | null;
  recipesData: RecipesData | null;
}

const initialState = {
  loading: false,
  error: null,
  recipesData: null,
};

const recipesReducer = (
  state: RecipesState = initialState,
  action: RecipesAction
): RecipesState => {
  switch (action.type) {
    case ActionType.REQUEST_API:
      return { loading: true, error: null, recipesData: null };
    case ActionType.REQUEST_API_SUCCESS:
      return { loading: false, error: null, recipesData: action.payload };
    case ActionType.REQUEST_API_ERROR:
      return {
        loading: false,
        error: action.payload,
        recipesData: null,
      };
    default:
      return state;
  }
};

export default recipesReducer;

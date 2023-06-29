import { ActionType } from "../action-types";
import { RecipesAction } from "../actions";

interface RecipesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const recipesReducer = (
  state: RecipesState = initialState,
  action: RecipesAction
): RecipesState => {
  switch (action.type) {
    case ActionType.REQUEST_API:
      return { loading: true, error: null, data: [] };
    case ActionType.REQUEST_API_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.REQUEST_API_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default recipesReducer;

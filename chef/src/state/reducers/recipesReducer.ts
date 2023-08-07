import { ActionType } from "../action-types";
import { RecipesAction, RecipesData } from "../actions";

interface RecipesState {
  loading: boolean;
  error: string | null;
  data: RecipesData;
}

const initialState = {
  loading: false,
  error: null,
  data: {} as RecipesData,
};

const recipesReducer = (
  state: RecipesState = initialState,
  action: RecipesAction
): RecipesState => {
  switch (action.type) {
    case ActionType.REQUEST_API:
      return { loading: true, error: null, data: {} as RecipesData };
    case ActionType.REQUEST_API_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.REQUEST_API_ERROR:
      return { loading: false, error: action.payload, data: {} as RecipesData };
    default:
      return state;
  }
};

export default recipesReducer;

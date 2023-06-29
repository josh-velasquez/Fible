import { ActionType } from "../action-types";

interface RequestApiAction {
  type: ActionType.REQUEST_API;
}

interface RequestApiSuccessAction {
  type: ActionType.REQUEST_API_SUCCESS;
  payload: string[];
}

interface RequestApiErrorAction {
  type: ActionType.REQUEST_API_ERROR;
  payload: string;
}

interface RequestRecipeApiAction {
  type: ActionType.REQUEST_API;
}

interface RequestRecipeApiSuccessAction {
  type: ActionType.REQUEST_API_SUCCESS;
  payload: Recipe;
}

interface RequestRecipeApiErrorAction {
  type: ActionType.REQUEST_API_ERROR;
  payload: string;
}

export interface Recipe {
  name: string;
  image: string;
  description: string;
  tags: string[];
  time: string;
  instructions: string[];
}

export type RecipeAction =
  | RequestRecipeApiAction
  | RequestRecipeApiSuccessAction
  | RequestRecipeApiErrorAction;

export type RecipesAction =
  | RequestApiAction
  | RequestApiSuccessAction
  | RequestApiErrorAction;

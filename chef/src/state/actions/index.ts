import { ActionType, RecipeActionType } from "../action-types";

export interface RecipesData {
  id: string;
  date: string;
  recipes: RecipeInfo[];
  tags: string[];
}

interface RequestApiAction {
  type: ActionType.REQUEST_API;
}

interface RequestApiSuccessAction {
  type: ActionType.REQUEST_API_SUCCESS;
  payload: RecipesData;
}

interface RequestApiErrorAction {
  type: ActionType.REQUEST_API_ERROR;
  payload: string;
}

interface RequestRecipeApiAction {
  type: RecipeActionType.REQUEST_RECIPE_API;
}

interface RequestRecipeApiSuccessAction {
  type: RecipeActionType.REQUEST_RECIPE_API_SUCCESS;
  payload: RecipeInfo;
}

interface RequestRecipeApiErrorAction {
  type: RecipeActionType.REQUEST_RECIPE_API_ERROR;
  payload: string;
}

export interface NewRecipeInfo {
  name: string;
  time: string;
  description: string;
  instructions: string[];
  tags: string[];
  image: File;
  favourite: boolean;
}

export interface RecipeInfo {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  instructions: string[];
  tags: string[];
  image: File | undefined;
  favourite: boolean;
}

export type RecipeAction =
  | RequestRecipeApiAction
  | RequestRecipeApiSuccessAction
  | RequestRecipeApiErrorAction;

export type RecipesAction =
  | RequestApiAction
  | RequestApiSuccessAction
  | RequestApiErrorAction;

import { ActionType, RecipeActionType, TagsActionType } from "../action-types";

interface RequestTagsApiAction {
  type: TagsActionType.REQUEST_TAGS_API;
}

interface RequestTagsApiActionSuccess {
  type: TagsActionType.REQUEST_TAGS_API_SUCCESS;
  payload: string[];
}

interface RequestTagsApiActionError {
  type: TagsActionType.REQUEST_TAGS_API_ERROR;
  payload: string;
}
interface RequestApiAction {
  type: ActionType.REQUEST_API;
}

interface RequestApiSuccessAction {
  type: ActionType.REQUEST_API_SUCCESS;
  payload: RecipeInfo[];
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
  id: string;
  name: string;
  time: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  favourite: boolean;
  image?: File;
  imageUrl?: string;
}

export interface RecipeInfo {
  id: string;
  name: string;
  time: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  image: File | string | undefined;
  favourite: boolean;
}

export interface RequestUpdateRecipeApiAction {
  type: RecipeActionType.REQUEST_UPDATE_RECIPE_API;
}

export interface RequestUpdateRecipeApiSuccessAction {
  type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_SUCCESS;
  payload: RecipeInfo;
}

export interface RequestUpdateRecipeApiErrorAction {
  type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_ERROR;
  payload: string;
}

export type RecipeAction =
  | RequestRecipeApiAction
  | RequestRecipeApiSuccessAction
  | RequestRecipeApiErrorAction
  | RequestUpdateRecipeApiAction
  | RequestUpdateRecipeApiSuccessAction
  | RequestUpdateRecipeApiErrorAction;

export type TagsAction =
  | RequestTagsApiAction
  | RequestTagsApiActionSuccess
  | RequestTagsApiActionError;

export type RecipesAction =
  | RequestApiAction
  | RequestApiSuccessAction
  | RequestApiErrorAction;

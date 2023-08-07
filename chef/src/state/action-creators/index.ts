import axios from "axios";
import { Dispatch } from "redux";
import { ActionType, RecipeActionType } from "../action-types";
import {
  RecipesAction,
  RecipeAction,
  RecipesData,
  NewRecipeInfo,
} from "../actions";
import serverConfig from "../../serverConfig.json";

export const getRecipeListApi = (): ((
  dispatch: Dispatch<RecipesAction>
) => Promise<void>) => {
  return async (dispatch: Dispatch<RecipesAction>): Promise<void> => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const { data } = await axios.get(
        `${serverConfig.serverBaseUrl}/api/chef`
      );
      const recipesData = JSON.parse(JSON.stringify(data)) as RecipesData;
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: recipesData,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.REQUEST_API_ERROR,
        payload: error.message,
      });
    }
  };
};

export const createNewRecipeApi = (
  newRecipeInfo: NewRecipeInfo
): ((dispatch: Dispatch<RecipeAction>) => Promise<void>) => {
  return async (dispatch: Dispatch<RecipeAction>): Promise<void> => {
    dispatch({
      type: RecipeActionType.REQUEST_RECIPE_API,
    });
    try {
      const formData = new FormData();
      formData.append("name", newRecipeInfo.name);
      formData.append("description", newRecipeInfo.description);
      formData.append("instructions", newRecipeInfo.instructions.join(";"));
      formData.append("time", newRecipeInfo.time);
      formData.append("tags", newRecipeInfo.tags.join(";"));
      formData.append("favourite", newRecipeInfo.favourite.toString());
      formData.append("image", newRecipeInfo.image ?? "");

      const { data } = await axios.post(
        `${serverConfig.serverBaseUrl}/api/chef/create-recipe`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      const newRecipe = JSON.parse(JSON.stringify(data));
      dispatch({
        type: RecipeActionType.REQUEST_RECIPE_API_SUCCESS,
        payload: newRecipe,
      });
      await getRecipeListApi()(dispatch);
    } catch (error: any) {
      dispatch({
        type: RecipeActionType.REQUEST_RECIPE_API_ERROR,
        payload: error.message,
      });
    }
  };
};

export const updateRecipeApi = (
  newRecipeInfo: NewRecipeInfo
): ((dispatch: Dispatch<RecipeAction>) => Promise<void>) => {
  return async (dispatch: Dispatch<RecipeAction>): Promise<void> => {
    dispatch({
      type: RecipeActionType.REQUEST_RECIPE_API,
    });
    try {
      const formData = new FormData();
      formData.append("name", newRecipeInfo.name);
      formData.append("description", newRecipeInfo.description);
      formData.append("instructions", newRecipeInfo.instructions.join(";"));
      formData.append("time", newRecipeInfo.time);
      formData.append("tags", newRecipeInfo.tags.join(";"));
      formData.append("favourite", newRecipeInfo.favourite.toString());
      formData.append("image", newRecipeInfo.image ?? "");

      const { data } = await axios.post(
        `${serverConfig.serverBaseUrl}/api/chef/update-recipe`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      const newRecipe = JSON.parse(JSON.stringify(data));
      dispatch({
        type: RecipeActionType.REQUEST_RECIPE_API_SUCCESS,
        payload: newRecipe,
      });
      await getRecipeListApi()(dispatch);
    } catch (error: any) {
      dispatch({
        type: RecipeActionType.REQUEST_RECIPE_API_ERROR,
        payload: error.message,
      });
    }
  };
};

import axios from "axios";
import { Dispatch } from "redux";
import { ActionType, RecipeActionType, TagsActionType } from "../action-types";
import {
  RecipesAction,
  RecipeAction,
  NewRecipeInfo,
  RecipeInfo,
  TagsAction,
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
        `${serverConfig.serverBaseUrl}/api/chef/recipes`
      );
      const recipesData = JSON.parse(JSON.stringify(data));
      const recipeInfoList: RecipeInfo[] = recipesData.map((recipe: any) => {
        const recipeJSON = JSON.parse(JSON.stringify(recipe));
        return {
          id: recipeJSON.id,
          name: recipeJSON.name,
          time: recipeJSON.time,
          description: recipeJSON.description,
          instructions: recipeJSON.instructions.split(";"),
          tags: recipeJSON.tags.split(";"),
          // TODO: Fix this to switch between
          image: recipeJSON.image ?? recipeJSON.imageUrl,
          favourite: recipeJSON.favourite,
        } as RecipeInfo;
      });
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: recipeInfoList,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.REQUEST_API_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getTagsListApi = (): ((
  dispatch: Dispatch<TagsAction>
) => Promise<void>) => {
  return async (dispatch: Dispatch<TagsAction>): Promise<void> => {
    dispatch({
      type: TagsActionType.REQUEST_TAGS_API,
    });

    try {
      const { data } = await axios.get(
        `${serverConfig.serverBaseUrl}/api/chef/tags`
      );
      const tags = JSON.parse(JSON.stringify(data)) as string[];
      dispatch({
        type: TagsActionType.REQUEST_TAGS_API_SUCCESS,
        payload: tags,
      });
    } catch (error: any) {
      dispatch({
        type: TagsActionType.REQUEST_TAGS_API_ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteRecipeApi = (
  recipeId: string
): ((dispatch: Dispatch<RecipeAction>) => Promise<void>) => {
  return async (dispatch: Dispatch<RecipeAction>): Promise<void> => {
    dispatch({
      type: RecipeActionType.REQUEST_UPDATE_RECIPE_API,
    });
    try {
      const { data } = await axios.delete(
        `${serverConfig.serverBaseUrl}/api/chef/delete-recipe/${recipeId}`
      );
      const newRecipe = JSON.parse(JSON.stringify(data));
      dispatch({
        type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_SUCCESS,
        payload: newRecipe,
      });
      await getRecipeListApi()(dispatch);
    } catch (error: any) {
      dispatch({
        type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_ERROR,
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
      formData.append("id", "newId");
      formData.append("name", newRecipeInfo.name);
      formData.append("description", newRecipeInfo.description);
      formData.append("instructions", newRecipeInfo.instructions.join(";"));
      formData.append("time", newRecipeInfo.time);
      formData.append("tags", newRecipeInfo.tags.join(";"));
      formData.append("favourite", newRecipeInfo.favourite.toString());
      formData.append("image", newRecipeInfo.image ?? "");
      formData.append("imageUrl", newRecipeInfo.imageUrl ?? "");

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
      console.warn("HERE 0")
      await getRecipeListApi()(dispatch);
    } catch (error: any) {
      console.warn("HERE")
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
      type: RecipeActionType.REQUEST_UPDATE_RECIPE_API,
    });
    try {
      const formData = new FormData();
      formData.append("id", newRecipeInfo.id);
      formData.append("name", newRecipeInfo.name);
      formData.append("description", newRecipeInfo.description);
      formData.append("instructions", newRecipeInfo.instructions.join(";"));
      formData.append("time", newRecipeInfo.time);
      formData.append("tags", newRecipeInfo.tags.join(";"));
      formData.append("favourite", newRecipeInfo.favourite.toString());
      if (newRecipeInfo.image) {
        formData.append("image", newRecipeInfo.image);
      } else if (newRecipeInfo.imageUrl) {
        formData.append("imageUrl", newRecipeInfo.imageUrl);
      }

      const { data } = await axios.put(
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
        type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_SUCCESS,
        payload: newRecipe,
      });
      await getRecipeListApi()(dispatch);
    } catch (error: any) {
      dispatch({
        type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_ERROR,
        payload: error.message,
      });
    }
  };
};

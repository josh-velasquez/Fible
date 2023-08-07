import axios from "axios";
import { Dispatch } from "redux";
import { ActionType, RecipeActionType } from "../action-types";
import { RecipesAction, RecipeAction, RecipesData } from "../actions";
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
      const chefPayload = JSON.parse(JSON.stringify(data)) as RecipesData;
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: chefPayload,
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
  recipeName: string,
  description: string,
  prepTime: string,
  instructions: string[],
  tags: string[],
  favourite: boolean,
  image: File
): ((dispatch: Dispatch<RecipeAction>) => Promise<void>) => {
  return async (dispatch: Dispatch<RecipeAction>): Promise<void> => {
    dispatch({
      type: RecipeActionType.REQUEST_RECIPE_API,
    });
    try {
      const formData = new FormData();
      formData.append("name", recipeName);
      formData.append("description", description);
      formData.append("instructions", instructions.join(";"));
      formData.append("time", prepTime);
      formData.append("tags", tags.join(";"));
      formData.append("favourite", favourite.toString());
      formData.append("image", image);

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

export const editRecipeApi = (
  recipeName: string,
  description: string,
  prepTime: string,
  instructions: string[],
  tags: string[],
  favourite: boolean,
  image: File
): ((dispatch: Dispatch<RecipeAction>) => Promise<void>) => {
  return async (dispatch: Dispatch<RecipeAction>): Promise<void> => {
    dispatch({
      type: RecipeActionType.REQUEST_RECIPE_API,
    });
    try {
      const formData = new FormData();
      formData.append("name", recipeName);
      formData.append("description", description);
      formData.append("instructions", instructions.join(";"));
      formData.append("time", prepTime);
      formData.append("tags", tags.join(";"));
      formData.append("favourite", favourite.toString());
      formData.append("image", image);

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

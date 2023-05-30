import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import serverConfig from "../../serverConfig.json";

// TODO: separate dispatch actions to its own reducers
export const getRecipeListApi = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const { data } = await axios.get(
        `${serverConfig.serverBaseUrl}/api/chef`
      );
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.REQUEST_API_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getFavouriteRecipes = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const { data } = await axios.get(
        `${serverConfig.serverBaseUrl}/api/chef/favourites`
      ).then(res => res.data);
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: data,
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
  image: File
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const formData = new FormData();
      formData.append("recipeName", recipeName);
      formData.append("description", description);
      formData.append("instructions", instructions.join());
      formData.append("prepTime", prepTime);
      formData.append("tags", tags.join());
      formData.append("image", image);
      const { data } = await axios.post(
        `${serverConfig.serverBaseUrl}/api/chef/create-recipe`,
        {
          recipeName: recipeName,
          instructions: instructions,
        }
      );
      const results = data.payload;
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: results,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.REQUEST_API_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getRecipeApi = (recipeId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const { data } = await axios.get(
        `${serverConfig.serverBaseUrl}/api/chef/${recipeId}`
      );
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.REQUEST_API_ERROR,
        payload: error.message,
      });
    }
  };
};

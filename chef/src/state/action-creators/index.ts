import axios from "axios";
import { Dispatch } from "redux";
import { ActionType, RecipeActionType } from "../action-types";
import { RecipesAction, RecipeAction } from "../actions";
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
      const recipeList = JSON.parse(JSON.stringify(data));
      const recipes = recipeList.recipes;
      dispatch({
        type: ActionType.REQUEST_API_SUCCESS,
        payload: recipes,
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
      formData.append("image", image);
      // TODO: Add option for user to favourite this on the FE
      formData.append("favourite", "false");
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

// export const getRecipeApi = (recipeId: string) => {
//   return async (dispatch: Dispatch<RecipeAction>) => {
//     dispatch({
//       type: ActionType.REQUEST_API,
//     });
//     try {
//       const { data } = await axios.get(
//         `${serverConfig.serverBaseUrl}/api/chef/${recipeId}`
//       );
//       console.warn("DATA: " + JSON.stringify(data));
//       dispatch({
//         type: ActionType.REQUEST_API_SUCCESS,
//         payload: data,
//       });
//     } catch (error: any) {
//       dispatch({
//         type: ActionType.REQUEST_API_ERROR,
//         payload: error.message,
//       });
//     }
//   };
// };

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

export const getRecipeListApi2 = (): ((
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
      // TODO: fix tags list and isntruction to be a string array on the database -- should work
      const recipesData = JSON.parse(JSON.stringify(data));
      const recipeInfoList = recipesData.map((recipe: any) => {
        return {
          id: recipe.id,
          name: recipe.name,
          time: recipe.time,
          description: recipe.description,
          instructions: recipe.instruction.split(","),
          tags: recipe.tags.split(","),
          image: recipe.image,
          favourite: recipe.favourite,
        } as RecipeInfo;
      });
      // const recipesData = [
      //   {
      //     id: "1",
      //     name: "Kims tiddies",
      //     date: "2121",
      //     time: "kims dogs",
      //     description: "Kims dogs are litty as a kitty",
      //     instructions: ["take kims dogs out", "eat kims dogs"],
      //     tags: ["hot", "not"],
      //     image: undefined,
      //     favourite: true,
      //   },
      // ];
      console.warn("TEST: " + JSON.stringify(recipesData));
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

// export const getRecipeListApi = (): ((
//   dispatch: Dispatch<RecipesAction>
// ) => Promise<void>) => {
//   return async (dispatch: Dispatch<RecipesAction>): Promise<void> => {
//     dispatch({
//       type: ActionType.REQUEST_API,
//     });
//     try {
//       const { data } = await axios.get(
//         `${serverConfig.serverBaseUrl}/api/chef`
//       );
//       const recipesData = JSON.parse(JSON.stringify(data)) as RecipesData;
//       dispatch({
//         type: ActionType.REQUEST_API_SUCCESS,
//         payload: recipesData,
//       });
//       saveToLocalStorage("recipes", JSON.stringify(recipesData));
//     } catch (error: any) {
//       dispatch({
//         type: ActionType.REQUEST_API_ERROR,
//         payload: error.message,
//       });
//     }
//   };
// };

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
      await getRecipeListApi2()(dispatch);
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
      await getRecipeListApi2()(dispatch);
    } catch (error: any) {
      dispatch({
        type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_ERROR,
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
        `${serverConfig.serverBaseUrl}/api/chef/delete-recipe?id=${recipeId}`
      );
      const newRecipe = JSON.parse(JSON.stringify(data));
      dispatch({
        type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_SUCCESS,
        payload: newRecipe,
      });
      await getRecipeListApi2()(dispatch);
    } catch (error: any) {
      dispatch({
        type: RecipeActionType.REQUEST_UPDATE_RECIPE_API_ERROR,
        payload: error.message,
      });
    }
  };
};

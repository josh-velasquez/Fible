import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const requestApi = (
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
      const { data } = await axios.post("http://localhost:7000/chef", {
        recipeName: recipeName,
        instructions: instructions,
      });
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

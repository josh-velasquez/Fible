import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const requestApi = (instructions: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REQUEST_API,
    });
    try {
      const { data } = await axios.post("http://localhost:7000/chef", {
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

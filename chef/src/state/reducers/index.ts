import { combineReducers } from "redux";
import chefReducer from "./chefReducer";

const reducers = combineReducers({
  results: chefReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

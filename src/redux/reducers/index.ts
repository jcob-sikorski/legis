import { combineReducers } from "redux";
import siteReducer from "./site";
import userReducer from "./user";

const rootReducer = combineReducers({
  site: siteReducer,
  user: userReducer,
});

export default rootReducer;

import { combineReducers } from "redux";

import account from "./account";
import general from "./general";
import companies from "./companies";

const rootReducer = combineReducers({
  account,
  general,
  companies,
});

export default rootReducer;

import { combineReducers } from "redux";

import account from "./account";
import general from "./general";
import companies from "./companies";
import questionnaire from "./questionnaire";

const rootReducer = combineReducers({
  account,
  general,
  companies,
  questionnaire,
});

export default rootReducer;

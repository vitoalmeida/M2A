import { combineReducers } from "redux";

import account from "./account";
import general from "./general";
import companies from "./companies";
import questionnaire from "./questionnaire";
import diagnostics from "./diagnostics";

const rootReducer = combineReducers({
  account,
  general,
  companies,
  questionnaire,
  diagnostics,
});

export default rootReducer;

import { AccountState } from "./account/types";
import { GeneralState } from "./general/types";
import { CompaniesState } from "./companies/types";
import { QuestionnaireState } from "./questionnaire/types";
export default interface ApplicationState {
  account: AccountState;
  general: GeneralState;
  companies: CompaniesState;
  questionnaire: QuestionnaireState;
}

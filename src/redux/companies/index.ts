/* eslint-disable default-param-last */
import { Reducer } from "redux";
import * as Actions from "./actions";
import { CompaniesState, CompaniesTypes } from "./types";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

const INITIAL_STATE: CompaniesState = {
  loading: false,
  company: null,
  editCompany: null,
  masterCompanies: null,
  companies: {
    data: null,
    count: null,
  },
  error: null,
};

const reducer: Reducer<CompaniesState> = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    // GET COMPANY
    case CompaniesTypes.GET_COMPANY_REQUEST:
      return { ...state, loading: true };

    case CompaniesTypes.GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: payload.data,
      };

    case CompaniesTypes.GET_COMPANY_FAILURE:
      return { ...state, loading: false };

    // GET MASTER COMPANIES
    case CompaniesTypes.GET_MASTER_COMPANIES_REQUEST:
      return { ...state, loading: true };

    case CompaniesTypes.GET_MASTER_COMPANIES_SUCCESS:
      return {
        ...state,
        masterCompanies: payload.data,
        loading: false,
      };

    case CompaniesTypes.GET_MASTER_COMPANIES_FAILURE:
      return { ...state, loading: false };

    // GET COMPANIES
    case CompaniesTypes.GET_COMPANIES_REQUEST:
      return { ...state, loading: true };

    case CompaniesTypes.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: { data: payload.data, count: payload.count },
      };

    case CompaniesTypes.GET_COMPANIES_FAILURE:
      return { ...state, loading: false };

    // REGISTER COMPANY
    case CompaniesTypes.REGISTER_COMPANY_REQUEST:
      return { ...state, loading: true, error: null };

    case CompaniesTypes.REGISTER_COMPANY_SUCCESS:
      return { ...state, loading: false, data: payload.data, error: false };

    case CompaniesTypes.REGISTER_COMPANY_FAILURE:
      return { ...state, loading: false, error: true };

    case CompaniesTypes.SET_EDIT_COMPANY_REQUEST:
      return { ...state, loading: true };

    case CompaniesTypes.SET_EDIT_COMPANY_SUCCESS:
      return { ...state, loading: false, editCompany: payload.data };

    case CompaniesTypes.SET_EDIT_COMPANY_FAILURE:
      return { ...state, loading: false };

    case CompaniesTypes.EDIT_COMPANY_REQUEST:
      return { ...state, loading: true, error: null };

    case CompaniesTypes.EDIT_COMPANY_SUCCESS:
      return { ...state, loading: false, error: false };

    case CompaniesTypes.EDIT_COMPANY_FAILURE:
      return { ...state, loading: false, error: true };

    case CompaniesTypes.REMOVE_EDIT_COMPANY:
      return { ...state, editCompany: null };

    case CompaniesTypes.CLEAR_ERROR:
      return { ...state, error: null };

    // CLEAR DATA
    case CompaniesTypes.CLEAR_DATA:
      return INITIAL_STATE;

    default:
      return state;
  }
};

// const persistConfig = {
//   key: "@M2A/Companies",
//   storage,
// };

export const CompaniesActions = Actions;
// export default persistReducer(persistConfig, reducer);
export default reducer;

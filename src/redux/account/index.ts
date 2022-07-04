/* eslint-disable default-param-last */
import { Reducer } from "redux";
import * as Actions from "./actions";
import { AccountState, AccountTypes } from "./types";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const INITIAL_STATE: AccountState = {
  loading: false,
  data: null,
  token: null,
  accountList: { data: null, count: null },
  editAccount: null,
};

const reducer: Reducer<AccountState> = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case AccountTypes.GET_ACCOUNT_REQUEST:
      return { ...state, loading: true };

    case AccountTypes.GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.data,
        token: payload.token,
      };

    case AccountTypes.GET_ACCOUNT_FAILURE:
      return { ...state, loading: false };

    case AccountTypes.GET_ACCOUNTS_REQUEST:
      return { ...state, loading: true };

    case AccountTypes.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accountList: {
          data: payload.data,
          count: payload.count,
        },
      };

    case AccountTypes.GET_ACCOUNTS_FAILURE:
      return { ...state, loading: false };

    case AccountTypes.REGISTER_ACCOUNT_REQUEST:
      return { ...state, loading: true };

    case AccountTypes.REGISTER_ACCOUNT_SUCCESS:
      return { ...state, loading: false, data: payload.data };

    case AccountTypes.REGISTER_ACCOUNT_FAILURE:
      return { ...state, loading: false };

    case AccountTypes.SET_EDIT_ACCOUNT_REQUEST:
      return { ...state, loading: true };

    case AccountTypes.SET_EDIT_ACCOUNT_SUCCESS:
      return { ...state, loading: false, editAccount: payload.data };

    case AccountTypes.SET_EDIT_ACCOUNT_FAILURE:
      return { ...state, loading: false };

    case AccountTypes.EDIT_ACCOUNT_REQUEST:
      return { ...state, loading: true };

    case AccountTypes.EDIT_ACCOUNT_SUCCESS:
      return { ...state, loading: false };

    case AccountTypes.EDIT_ACCOUNT_FAILURE:
      return { ...state, loading: false };

    case AccountTypes.REMOVE_EDIT_ACCOUNT:
      return { ...state, editAccount: null };

    case AccountTypes.CLEAR_DATA:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const persistConfig = {
  key: "@M2A/Account",
  storage,
  whitelist: ["data", "token"],
};

export const AccountActions = Actions;
export default persistReducer(persistConfig, reducer);

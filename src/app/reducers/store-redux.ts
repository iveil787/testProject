import {
  // ActionReducer,
  ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {countNode, CountState, countReducer} from "./count/count.reducer";

import {Student} from "../../models/UserStudents";
import {loginUser, loginUserReducer} from "./redux-login/login.reduser";
import {errorsList, errorReduser, ErrorsList} from "./errors/error.reduser";
import {tableUser, tableUserReducer} from "./table-user/table.reduser";


export interface State {

  [countNode]: CountState;

  [loginUser]: Student[];

  [errorsList]: ErrorsList;

  [tableUser]: Student[];

  // [userNode]: Student[];
}


export const reducers: ActionReducerMap<State> = {
  // @ts-ignore

  // [userNode]: userReducerRegis,
  [countNode]: countReducer,
  [loginUser]: loginUserReducer,
  [errorsList]: errorReduser,
  [tableUser]: tableUserReducer,
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

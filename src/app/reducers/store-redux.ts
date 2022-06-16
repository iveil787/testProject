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
import {homeWorkReduser, listHomework} from "./homework/homework.reduser";
import {Homework} from "../../services/login.service";


export interface State {

  [countNode]: CountState;

  [loginUser]: Student[];

  [errorsList]: ErrorsList;

  [tableUser]: Student[];

  [listHomework]: Homework[];
}


export const reducers: ActionReducerMap<State> = {
  // @ts-ignore

  [countNode]: countReducer,
  [loginUser]: loginUserReducer,
  [errorsList]: errorReduser,
  [tableUser]: tableUserReducer,
  [listHomework]: homeWorkReduser,
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];



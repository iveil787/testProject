import {
  // ActionReducer,
  ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {countNode, CountState, countReducer} from "./count/count.reducer";
import {userNode, userReducerRegis} from "./redux-welcome/register.reduser";
import {Student} from "../../models/UserStudents";
import {loginUser, loginUserReducer} from "./redux-login/login.reduser";
import {errorsList, errorReduser, ErrosList} from "./errors/error.reduser";


export interface State {

  [countNode]: CountState;

  [userNode]: Student[];

  [loginUser]: Student[];

  [errorsList]: ErrosList;

}


export const reducers: ActionReducerMap<State> = {
  // @ts-ignore
  [countNode]: countReducer,
  [userNode]: userReducerRegis,
  [loginUser]: loginUserReducer,
  [errorsList]: errorReduser,
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

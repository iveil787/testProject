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


export interface State {
  [countNode]: CountState;

  [userNode]: Student[];

}


export const reducers: ActionReducerMap<State> = {
  // @ts-ignore
  [countNode]: countReducer,

  [userNode]: userReducerRegis,
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

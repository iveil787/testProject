import {
  // ActionReducer,
  ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {Student} from "../../../models/UserStudents";
import {userReducerRegis} from "./register.reduser";
import {userNode} from "./register.reduser";


export interface State {
  [userNode]: Student[];

}

export const reducers: ActionReducerMap<State> = {
  [userNode]: userReducerRegis
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

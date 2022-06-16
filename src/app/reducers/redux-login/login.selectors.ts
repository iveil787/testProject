import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Student} from "../../../models/UserStudents";
import {loginUser} from "./login.reduser";


export const selectorsloginUserFeature = createFeatureSelector<Student>(loginUser);

export const selectorlogin = createSelector(
  selectorsloginUserFeature,
  (state: Student): string => state.login
);

export const selectorPassword = createSelector(
  selectorsloginUserFeature,
  (state: Student): string => state.password
);

export const selectorCurrentUser = createSelector(
  selectorsloginUserFeature,
  (state: Student): string => state.id
);

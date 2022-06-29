import {createFeatureSelector, createSelector} from "@ngrx/store";
import {tableUser} from "./table.reduser";
import {Student} from "../../../models/UserStudents";


export const tableSelectorFeature = createFeatureSelector<Student[]>(tableUser);

export const tableSelector = createSelector(
  tableSelectorFeature,
  (tableDate: Student[]) => tableDate
);

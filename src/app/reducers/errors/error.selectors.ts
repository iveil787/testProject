import {createFeatureSelector, createSelector} from "@ngrx/store";
import {errorsList, ErrorsList} from "./error.reduser";


export const selectErrorFeature = createFeatureSelector<ErrorsList>(errorsList);

export const selectError = createSelector(
  selectErrorFeature,
  (error: ErrorsList): string => error.error
);

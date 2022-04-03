import {createFeatureSelector, createSelector} from "@ngrx/store";
import {errorsList, ErrosList} from "./error.reduser";


export const selectErrorFeature = createFeatureSelector<ErrosList>(errorsList);

export const selectError = createSelector(
  selectErrorFeature,
  (error: ErrosList): string => error.error
);

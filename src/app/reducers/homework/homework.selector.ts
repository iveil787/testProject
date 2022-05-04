import {createFeatureSelector, createSelector} from "@ngrx/store";
import {listHomework} from "./homework.reduser";
import {Homework} from "../../../services/login.service";

export const homeworkSelectorFeature = createFeatureSelector<Homework[]>(listHomework);

export const tableHomeworkSelector = createSelector(
  homeworkSelectorFeature,
  (tableDate: Homework[]) => tableDate
);

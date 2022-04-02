import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Student} from "../../../models/UserStudents";
import {userNode} from "./register.reduser";

const selectorUserFeature = createFeatureSelector<Student>(userNode);
// пока что не нужен, мне ничего не нужно в компонент посывать
export  const  selectUser = createSelector(
  selectorUserFeature,
  (state:Student): number => state.id
);

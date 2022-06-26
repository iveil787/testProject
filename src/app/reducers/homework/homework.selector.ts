import {createFeatureSelector, createSelector} from "@ngrx/store";
import {listHomework} from "./homework.reduser";
import {Homework} from "../../../services/login.service";

export const homeworkSelectorFeature = createFeatureSelector<Homework[]>(listHomework);

export const tableHomeworkSelector = createSelector(
  homeworkSelectorFeature,
  (tableDate: Homework[]) => tableDate
);

export const filterTeacherHomeworkSelector = createSelector(
  homeworkSelectorFeature,
  (tableDate: Homework[]) => tableDate.filter(HW => HW.idTeacher === JSON.parse(localStorage.getItem("token") as string)?.id)
);

export const filterStudentHomeworkSelector = createSelector(
  homeworkSelectorFeature,
  (tableDate: Homework[]) => tableDate.filter(HW => HW.nicknameStudent === JSON.parse(localStorage.getItem("token") as string)?.id)
);

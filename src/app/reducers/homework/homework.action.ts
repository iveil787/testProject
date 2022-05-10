import {Action} from "@ngrx/store";
import {Student} from "../../../models/UserStudents";
import {Homework} from "../../../services/login.service";

export enum HomeworkActions {
  taskCreateHomeworkActions = "[homework] taskCreateHomeworkActions",
  successCreateHomeworkActions = "[homework] successCreateHomeworkActions",
  errorHomework = "[homework] errorHomework",
  taskCreateTableHomeworkActions = "[homework] TaskCreateTableHomeworkActions",
  successCreateTableHomeworkActions = "[homework] successCreateTableHomeworkActions",
  successEditHomeworkActions ="[homework] successEditHomeworkActions",
  taskEditHomeworkActions="[homework] taskEditHomeworkActions",


}

// ========================================Create Homework========================================

export class TaskCreateHomeworkActions implements Action {
  constructor(public payload: Homework) {
  }

  readonly type = HomeworkActions.taskCreateHomeworkActions;
}

export class SuccessCreateHomeworkActions implements Action {
  constructor(public payload: Homework) {
  }

  readonly type = HomeworkActions.successCreateHomeworkActions;
}

export class TaskEditHomeworkActions implements Action {
  constructor(public payload: Homework) {
  }

  readonly type = HomeworkActions.taskEditHomeworkActions;
}

export class SuccessEditHomeworkActions implements Action {
  constructor(public payload: Student[]) {
  }

  readonly type = HomeworkActions.successEditHomeworkActions;
}

// ========================================Create Table Homework========================================
export class TaskCreateTableHomeworkActions implements Action {

  readonly type = HomeworkActions.taskCreateTableHomeworkActions;
}

export class SuccessCreateTableHomeworkActions implements Action {
  constructor(public payload: Student[]) {
  }

  readonly type = HomeworkActions.successCreateTableHomeworkActions;
}







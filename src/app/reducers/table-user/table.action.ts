import {Action} from "@ngrx/store";
import {Student} from "../../../models/UserStudents";

export enum UserActions {
  taskCreateTableUser = "[table] taskCreateTableUser",
  errorCreateTableUser = "[table] errorCreateTableUser",
  successCreateTableUser = "[table] successCreateTableUser",
  taskCreateUserRedux = "[user] taskCreateUserRedux",
  errorCreateUser = "[user] errorCreateUser",
  successCreateUser = "[user] successCreateUser",
}

// ========================================Create User========================================
export class TaskCreateUserAction implements Action {
  constructor(public payload: Student) {
  }

  readonly type = UserActions.taskCreateUserRedux;
}


export class SuccessCreateUserAction implements Action {
  constructor(public payload: Student) {
  }

  readonly type = UserActions.successCreateUser;
}

// ========================================Create Table User========================================
export class TaskCreateTableUser implements Action {


  readonly type = UserActions.taskCreateTableUser;
}

export class ErrorCreateUserAction implements Action {
  constructor(public payload: Student) {

  }

  readonly type = UserActions.errorCreateTableUser;
}

export class SuccessCreateTableUserAction implements Action {
  constructor(public payload: Student[]) {
  }

  readonly type = UserActions.successCreateTableUser;
}

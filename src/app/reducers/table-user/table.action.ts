import {Action} from "@ngrx/store";
import {Student} from "../../../models/UserStudents";
// import {registerUserActions} from "../redux-welcome/register.actions";

export enum UserActions {
  taskCreateTableUser = "[table] taskCreateTableUser",
  errorCreateTableUser = "[table] errorCreateTableUser",
  successCreateTableUser = "[table] successCreateTableUser",
  taskCreateUserRedux = "[user] taskCreateUserRedux",
  errorCreateUser = "[user] errorCreateUser",
  successCreateUser = "[user] successCreateUser",
}

// ========================================Для регистрации Action========================================
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
// ========================================Для регистрации Action========================================
export class TaskCreateTableUser implements Action {
  // constructor(public payload: Student) {
  //
  // }

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

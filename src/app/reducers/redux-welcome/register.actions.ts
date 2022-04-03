import {Action} from "@ngrx/store";
import {Student} from "../../../models/UserStudents";

export enum registerUserActions {
  taskCreateUserRedux = "[user] taskCreateUserRedux",
  errorCreateUser = "[user] errorCreateUser",
  successCreateUser = "[user] successCreateUser",

}

export class TaskCreateUserAction implements Action {
  constructor(public payload: Student) {

  }

  readonly type = registerUserActions.taskCreateUserRedux;
}

export class ErrorCreateUserAction implements Action {
  constructor(public payload: Student) {

  }

  readonly type = registerUserActions.errorCreateUser;
}

export class SuccessCreateUserAction implements Action {
  constructor(public payload: Student) {
  }

  readonly type = registerUserActions.successCreateUser;
}

// потом допиши ещё экшики и хранилища не зубудь

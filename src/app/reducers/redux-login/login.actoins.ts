import {Action} from "@ngrx/store";
import {Student} from "../../../models/UserStudents";

export enum loginUserActions {
  taskloginUserRedux = "[user] taskloginUserRedux",
  findUserAction = "[user] findUserAction",
  errorAuthUserAction = "[user] errorAuthUserAction",
}

export class TaskloginUserAction implements Action {
  constructor(public payload: {
    login: string,
    password: string,
  }) {
  }

  readonly type = loginUserActions.taskloginUserRedux;
}

export class FindUserAction implements Action {
  constructor(public payload: Student) {
  }

  readonly type = loginUserActions.findUserAction;
}

export class ErrorAuthUserAction implements Action {
  constructor(public payload: string) {
  }

  readonly type = loginUserActions.errorAuthUserAction;
}


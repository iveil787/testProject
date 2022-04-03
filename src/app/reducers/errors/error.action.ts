import {Action} from "@ngrx/store";

export enum ErrorsActions {
  taskErrorsActions = "[Error] taskErrorsActions",
  successErrorsActions = "[Error] successErrorsActions",
}

export class TaskErrorsActions implements Action {


  readonly type = ErrorsActions.taskErrorsActions;
}

export class SuccessErrorsActoin implements Action {

  readonly type = ErrorsActions.successErrorsActions;
}


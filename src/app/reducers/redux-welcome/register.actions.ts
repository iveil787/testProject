import {Action} from "@ngrx/store";
import {Student} from "../../../models/UserStudents";

export enum registerUserActions {
  addUserRedux = "[user] addUserRedux",

}

export class userAddUserAction implements Action {

  constructor(public payload: Student){

  }

  readonly type = registerUserActions.addUserRedux;
  // readonly payload = ''

}

// потом допиши ещё экшики и хранилища не зубудь

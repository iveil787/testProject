import {ErrorsActions} from "./error.action";

export const errorsList = "Errors";

export interface ErrorsList {
  error: string,
}

const initialError: ErrorsList = {
  error: "Cleare",
}

export const errorReduser = (state: ErrorsList = initialError, action: any) => {
  switch (action.type) {
    case ErrorsActions.taskErrorsActions:
      return {
        ...state,
        error: "errorUserNotFound",
      }
    default:
      return state;
  }

}

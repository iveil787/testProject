import {ErrorsActions} from "./error.action";

export const errorsList = "Error";

export interface ErrosList {
  error: string,
}

const initialError: ErrosList = {
  error: "Cleare",
}

export const errorReduser = (state: ErrosList = initialError, action: any) => {
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

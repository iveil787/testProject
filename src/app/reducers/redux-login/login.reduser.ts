import {Student} from "../../../models/UserStudents";
import {loginUserActions} from "./login.actoins";

export const loginUser = "loginUser";


const initialStatelogin: Student[] = [
  {
    id: "11111111",
    email: "yyy@yandex.ru",
    login: "rr",
    password: "rr",
    name: "rr",
    surname: "rr",
    patronymic: "rr",
    dateBirth: 1648065159780,
    studyGroup: "rr",
  }];

export const loginUserReducer = (state = initialStatelogin, action: any) => {

  switch (action.type) {
    case loginUserActions.findUserAction:
      return [action.payload];
    default:
      return state;
  }

}

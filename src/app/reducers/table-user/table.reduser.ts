import {Student} from "../../../models/UserStudents";
import {UserActions} from "./table.action";

export const tableUser = "tableUser"

const initialTableUser: Student[] = [
  {
    id: 11111111,
    email: "yyy@yandex.ru",
    login: "rr",
    password: "rr",
    name: "rr",
    surname: "rr",
    patronymic: "rr",
    dateBirth: 1648065159780,
    studyGroup: "rr",
  }];

export const tableUserReducer = (state = initialTableUser, action: any) => {

  switch (action.type) {
    case UserActions.successCreateTableUser:
      return action.payload;
    case UserActions.successCreateUser:
      return [...state, action.payload];
    default:
      return state;
  }

}

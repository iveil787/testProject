import {Student} from "../../../models/UserStudents";
import {registerUserActions} from "./register.actions";

export const userNode = "user";

const initialStateRegis: Student[] = [
  {
    id: 789789,
    email: "yyy@yandex.ru",
    login: "rr",
    password: "rr",
    name: "rr",
    surname: "rr",
    patronymic: "rr",
    dateBirth: 1648065159780,
    studyGroup: "rr",
  }];

export const userReducerRegis = (state = initialStateRegis, action: any) => {

  switch (action.type) {
       case registerUserActions.successCreateUser:
      return [...state, action.payload];
    default:
      return state;
  }
}


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
  // return state;
  // const user = {
  //   id: 1234123,
  //   email: "yyy@yandex.ru",
  //   login: "rrrrrrr",
  //   password: "rrrrrrrrrrr",
  //   name: "rr",
  //   surname: "rr",
  //   patronymic: "rr",
  //   dateBirth: 1648065159780,
  //   studyGroup: "rr",
  // }

  // let state2 = [...state]; qqqq


  switch (action.type) {
    case registerUserActions.addUserRedux:
      return [...state, action.payload];
    // state2.push(user);

    // return state2

    // return {
    //   ...state, user
    // }
    default:
      return state;
  }
}


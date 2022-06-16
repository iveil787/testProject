import {Homework} from "../../../services/login.service";
import {HomeworkActions} from "./homework.action";

export const listHomework = "listHomework";

const initialHomework: Homework [] = [
  {
    id: "525b8d0f-d127-4f2c-8549-9bc06a859c8c",
    idTeacher: "брать значение из токена",
    nicknameStudent: "rr",
    homework: "rr",
    description: "rr",
    startDate: 44,
    endDate: 55,
    wishes: "rr"
  }]

export const homeWorkReduser = (state: Homework[] = initialHomework, action: any) => {

  switch (action.type) {
    case HomeworkActions.successCreateTableHomeworkActions:
      return [...action.payload];
    case HomeworkActions.successCreateHomeworkActions:
      return [...state, action.payload];
    case HomeworkActions.successEditHomeworkActions:
      return [...state.map((editTest) => {
          if (action.payload.id === editTest.id) {
            return action.payload
          } else {
            return editTest
          }
        }
      )];
    case HomeworkActions.successDelletHomeworkActions:
      return [...state.filter(HW => HW.id !== action.payload.id)];
    default:
      return state;
  }

}


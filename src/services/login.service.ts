import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Student} from "../models/UserStudents";
import {Observable} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

export interface Homework {
  id: string;
  idTeacher: string;
  nicknameStudent: string;
  homework: string;
  description: string;
  startDate: number;
  endDate: number;
  wishes: string;
  status_HW?: string;
  nameTeacher?: string;
  surnameTeacher?: string;
  patronymicTeacher?: string;
  studyTeacher?: string;
  emailTeacher?: string;
  idStudent?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private message: NzMessageService) {
  }

  modelUserStudent: Student[] = [
    {
      id: "1", email: "Dr Nice", login: "fff", password: "4545", name: "fdf", surname: "Faust", patronymic: "ff",
      dateBirth: 4444, studyGroup: "1", role: "STUDENT",
    },
  ];

  addData(user: Student): Observable<void> {
    this.modelUserStudent.push(user);
    const body = {
      id: uuidv4(),
      email: user.email,
      login: user.login,
      password: user.password,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      dateBirth: user.dateBirth,
      studyGroup: user.studyGroup,
      role: "STUDENT",
    };
    return this.http.post<void>('http://localhost:3000/user', body);
  }

  addDataTeacher(user: Student): Observable<void> {
    this.modelUserStudent.push(user);
    const body = {
      id: uuidv4(),
      email: user.email,
      login: user.login,
      password: user.password,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      dateBirth: user.dateBirth,
      studyGroup: user.studyGroup,
      role: "TEACHER",
    };
    return this.http.post<void>('http://localhost:3000/user', body);
  }

  checkToken(): void {
    if (localStorage.getItem("token")) {
      console.log("Токен есть", false)
      this.checkTokenTime()
    } else {
      console.log("токена нет", true)
      this.router.navigate(['login'])
    }
  };

  checkTokenTime(): void {
    const limit = 24 * 3600 * 1000;
    let tokenObj = JSON.parse(localStorage.getItem("token") as string);
    if (+new Date() - Date.parse(tokenObj.time) > limit) {
      console.log("время истекло")
      localStorage.clear();
    } else {
      console.log("время ещё есть")
      this.checkTokenID()
    }
  };

  checkTokenID(): void {
    let tokenObj = JSON.parse(localStorage.getItem("token") as string);
    this.http.get <Student[]>("http://localhost:3000/user?id=" + tokenObj.id).subscribe((data: Student[]) => {
      if (data[0]?.id === tokenObj.id) {
        console.log("id верный")
      } else {
        console.log("id не верный")
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
  }

  getLoginService(login: string, password: string): Observable<Student[]> {
    return this.http.get <Student[]>("http://localhost:3000/user?login=" + login + "&password=" + password)
  }

  getAllUser(): Observable<Student[]> {
    return this.http.get <Student[]>("http://localhost:3000/user");
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

  currentUser(): Observable<Student[]> {
    const tokenObj = JSON.parse(localStorage.getItem("token") as string);
    return this.http.get <Student[]>("http://localhost:3000/user?id=" + tokenObj.id)
  }

// ++++++++++++++++++++++++++++++++++++ servis homework +++++++++++++++++++++++++++++++++++++
  getAllHomework(): Observable<Homework[]> {
    return this.http.get <Homework[]>("http://localhost:3000/homework");
  }

  modelHomework: Homework[] = [];

  modelEditHomework: Homework[] = [];

  addHomework(user: Homework): Observable<void> {
    this.modelHomework.push(user);
    const body = {
      id: user.id,
      idTeacher: user.idTeacher,
      nicknameStudent: user.nicknameStudent,
      homework: user.homework,
      description: user.description,
      startDate: user.startDate,
      endDate: user.endDate,
      wishes: user.wishes,
      status_HW: "Задано",
      nameTeacher: user.nameTeacher,
      idStudent: user.idStudent,
      surnameTeacher: user.surnameTeacher,
      patronymicTeacher: user.patronymicTeacher,
      studyTeacher: user.studyTeacher,
      emailTeacher: user.emailTeacher,
    };

    return this.http.post<void>("http://localhost:3000/homework", body);
  }

  addEditHomework(user: Homework): Observable<void> {
    this.modelEditHomework.push(user);
    const body = {
      id: user.id,
      idTeacher: user.idTeacher,
      nicknameStudent: user.nicknameStudent,
      homework: user.homework,
      description: user.description,
      startDate: user.startDate,
      endDate: user.endDate,
      wishes: user.wishes,
      status_HW: "Задано",
      nameTeacher: user.nameTeacher,
      idStudent: user.idStudent,
      surnameTeacher: user.surnameTeacher,
      patronymicTeacher: user.patronymicTeacher,
      studyTeacher: user.studyTeacher,
      emailTeacher: user.emailTeacher,
    };

    return this.http.put<void>("http://localhost:3000/homework/" + body.id, body);
  }

  addEditStatusHomework(user: Homework): Observable<void> {
    this.modelEditHomework.push(user);
    const body = {
      id: user.id,
      idTeacher: user.idTeacher, nicknameStudent: user.nicknameStudent,
      homework: user.homework, description: user.description,

      startDate: user.startDate, endDate: user.endDate,

      wishes: user.wishes, status_HW: "Выполнено",
    };

    return this.http.put<void>("http://localhost:3000/homework/" + body.id, body);
  }


  deleteHW(HW: Homework) {
    console.log("cach")
    return this.http.delete<void>("http://localhost:3000/homework/" + HW.id);
  }

}


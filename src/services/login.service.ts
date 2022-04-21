import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Student} from "../models/UserStudents";
import {Observable} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {
  }

  modelUserStudent: Student[] = [
    {
      id: 1, email: "Dr Nice", login: "fff", password: "4545", name: "fdf", surname: "Faust", patronymic: "ff",
      dateBirth: 4444, studyGroup: "1"
    },
  ];

  addData(user: Student): Observable<void> {
    this.modelUserStudent.push(user);
    const body = {
      id: uuidv4(), email: user.email, login: user.login, password: user.password, name: user.name,
      surname: user.surname, patronymic: user.patronymic, dateBirth: user.dateBirth, studyGroup: user.studyGroup
    };
    return this.http.post<void>('http://localhost:3000/posts', body);
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
    this.http.get <Student[]>("http://localhost:3000/posts?id=" + tokenObj.id).subscribe((data: Student[]) => {
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
    return this.http.get <Student[]>("http://localhost:3000/posts?login=" + login + "&password=" + password)
  }

  getAllUser(): Observable<Student[]> {
    return this.http.get <Student[]>("http://localhost:3000/posts");
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  currentUser(): Observable<Student[]> {
    const tokenObj = JSON.parse(localStorage.getItem("token") as string);
    return this.http.get <Student[]>("http://localhost:3000/posts?id=" + tokenObj.id)
  }


  test(){
    console.log("you catch it")
  }
}


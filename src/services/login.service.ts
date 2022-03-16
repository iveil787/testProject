import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from "../models/UserStudents";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

// проверка метода addStudents()
  modelUserStudent: Student[] = [
    { id: 1, email: "Dr Nice",login: "fff", password:"4545", name:"fdf", surname: "Faust", patronymic: "ff",
      dateBirth: 4444 , studyGroup: "1" },
  ];

  getData(): Student[] {
    // проверка
    console.log( this.modelUserStudent);
    return this.modelUserStudent;
  }

// пушим в массив и посылаем на сервер
  addData(user: Student): Observable<void>{
    this.modelUserStudent.push(user);
    const body = {id: Math.random()*1000, email: user.email,login: user.login,password: user.password,name: user.name,
      surname: user.surname,patronymic: user.patronymic,dateBirth: user.dateBirth,studyGroup: user.studyGroup };
    return this.http.post<void>('http://localhost:3000/posts', body);
  }

  // поход на сервак за данными (в разрабоктке) выводим все даныне
  // getDatSaerve(){
  //
  //   this.http.get("http://localhost:3000/posts",).subscribe(data =>console.log(data));
  //   return this.http.get("posts");
  // }

  getLoginSaerve(login:string, password:string){
    // ${1 + 2}
    this.http.get("http://localhost:3000/posts?login="+ login +"&password="+ password).subscribe(data =>console.log(data));
    return this.http.get("posts");
  }

  // postLogin(user: Student): Observable<void>{
  //   this.modelUserStudent.push(user);
  //   const body = {id: Math.random()*1000, email: user.email,login: user.login,password: user.password,name: user.name,
  //     surname: user.surname,patronymic: user.patronymic,dateBirth: user.dateBirth,studyGroup: user.studyGroup };
  //   return this.http.post<void>('http://localhost:3000/posts', body);
  // }

}


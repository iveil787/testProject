import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from "../models/UserStudents";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  modelUserStudent: Student[] = [
    { id: 1, email: "Dr Nice",login: "fff", password:"4545", name:"fdf", surname: "Faust", patronymic: "ff",
      dateBirth: 4444 , studyGroup: "1" },
  ];

  getData(): Student[] {
    // проверка
    console.log( this.modelUserStudent);
    return this.modelUserStudent;
  }


// пушиш в массив и посылаем на сервер
  addData(user: any){
    this.modelUserStudent.push(user);
    const body = {id: user.id, email: user.email,login: user.login,password: user.password,name: user.name,
      surname: user.surname,patronymic: user.patronymic,dateBirth: user.dateBirth,studyGroup: user.studyGroup };
    return this.http.post('http://localhost:3000/posts', body);
  }

  getDatSaerve(){

    this.http.get("http://localhost:3000/posts",).subscribe(data =>console.log(data));
    return this.http.get("posts");
  }


  // postData(user: any){
  //
  //   const body = {id: user.id, email: user.email,login: user.login,password: user.password,name: user.name,
  //     surname: user.surname,patronymic: user.patronymic,dateBirth: user.dateBirth,studyGroup: user.studyGroup };
  //   return this.http.post('http://localhost:3000/posts', body);
  // }

  constructor(private http: HttpClient) { }
}


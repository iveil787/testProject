import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Student} from "../models/UserStudents";
import {Observable} from "rxjs";
// import {JSONFile} from "@angular/cli/utilities/json-file";
import { v4 as uuidv4 } from 'uuid';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private router: Router) {
  }

// проверка метода addStudents()
  modelUserStudent: Student[] = [
    {
      id: 1, email: "Dr Nice", login: "fff", password: "4545", name: "fdf", surname: "Faust", patronymic: "ff",
      dateBirth: 4444, studyGroup: "1"
    },
  ];

  getData(): Student[] {
    // проверка
    console.log(this.modelUserStudent);
    return this.modelUserStudent;
  }
  // Math.random() * 1000
// пушим в массив и посылаем на сервер
  addData(user: Student): Observable<void> {
    this.modelUserStudent.push(user);
    const body = {
      id: uuidv4(), email: user.email, login: user.login, password: user.password, name: user.name,
      surname: user.surname, patronymic: user.patronymic, dateBirth: user.dateBirth, studyGroup: user.studyGroup
    };
    return this.http.post<void>('http://localhost:3000/posts', body);
  }

  // поход на сервак за данными (в разрабоктке) выводим все даныне
  // getDatSaerve(){
  //
  //   this.http.get("http://localhost:3000/posts",).subscribe(data =>console.log(data));
  //   return this.http.get("posts");
  // }

  checkToken(): void{
    // localStorage.getItem("token");
    if (localStorage.getItem("token")){
      console.log("Токен есть",false)
      this.checkTokenTime()
    } else {
      console.log("токена нет",true)
      this.router.navigate(['login'])
    }
  };

  checkTokenTime(){
    const limit = 24 * 3600 * 1000;
    let tokenObj = JSON.parse(localStorage.getItem("token") as string);

    // console.log(tokenObj.time);
    // console.log(tokenObj.id);
    // console.log(Date.parse(tokenObj.time));

    if (+new Date() - Date.parse(tokenObj.time) > limit){
      console.log("время истекло")
      localStorage.clear();
    } else {
      console.log("время ещё есть")
      // this.checkTokenID() Поверка циклится
    }
  };

  checkTokenID(){
    // JSON.parse(localStorage.getItem("token") as string
    // JSON.parse(localStorage['token']
    let tokenObj = JSON.parse(localStorage.getItem("token") as string);
    // if (login === tokenObj.id){
    //   console.log("id верный")
    // } else {
    //   console.log("id не верный")
    // }
    // console.log(login);
    // console.log(tokenObj.id);
    this.http.get <Student[]>("http://localhost:3000/posts?id=" + tokenObj.id).subscribe((data: Student[]) => {
      if ({id: data[0].id === tokenObj.id}){
        console.log("id верный")
      } else {
        console.log("id не верный")
        localStorage.clear();
      }
    });
  }
// getLoginSaerve(login:string, password:string){
  //   // ${1 + 2}
  //   this.http.get("http://localhost:3000/posts?login="+ login +"&password="+ password).subscribe(data =>console.log(data));
  //   return this.http.get("posts");
  // }
  getLoginSaerve(login: string, password: string):Observable <Student[]> {
    // ${1 + 2}
    return  this.http.get <Student[]>("http://localhost:3000/posts?login=" + login + "&password=" + password)
    // // localStorage.setItem()
    // // Observable<ArrayBuffer>;
    // // <Obs<Student>>

    // return this.http.get("posts");
  }
  // postLogin(user: Student): Observable<void>{
  //   this.modelUserStudent.push(user);
  //   const body = {id: Math.random()*1000, email: user.email,login: user.login,password: user.password,name: user.name,
  //     surname: user.surname,patronymic: user.patronymic,dateBirth: user.dateBirth,studyGroup: user.studyGroup };
  //   return this.http.post<void>('http://localhost:3000/posts', body);
  // }

}


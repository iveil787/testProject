import {Inject, Pipe, PipeTransform} from '@angular/core';
import {Student} from "../models/UserStudents";
import {FormBuilder} from "@angular/forms";
import {LoginService} from "./login.service";


@Pipe({name: 'role'})
export class RolePipe implements PipeTransform {
  subscription: any
  currentUser: Student | undefined;


  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService) {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.subscription = this.loginservice.currentUser().subscribe((data: Student[]) => (this.currentUser = data[0]));

  }


  transform(value: string | undefined): boolean {
    return value === JSON.parse(localStorage.getItem("token") as string)?.role;

  }
}

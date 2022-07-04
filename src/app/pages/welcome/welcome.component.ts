import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../../../services/login.service";

import {Store} from "@ngrx/store";
import {CountState} from "../../reducers/count/count.reducer";
import {TaskCreateUserAction} from "../../reducers/table-user/table.action";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
})
export class WelcomeComponent implements OnInit {

  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService,
              private store$: Store<CountState>) {
  }

  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      userName: [null, [Validators.required],],
      userSurname: [null, [Validators.required]],
      userPatronymic: [null, [Validators.required]],
      userDateBirth: [null],
      studyGroup: [null, [Validators.required]],
    });
  }

  // =====================================сабмитим====submitForm()==========================================
  submitForm(): void {
    if (this.myForm.valid) {
      this.addStudents();
    } else {
      Object.values(this.myForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  // ====================================методы для валидации==============================================
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.myForm.controls["checkPassword"].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.myForm.controls["password"].value) {
      return {confirm: true, error: true};
    }
    return {};
  };

// ==========================================addStudents==========================================
//   этот метод работает напрямую с сервисом;
  addStudents(): void {
    const newStudent = {
      id: "1",
      email: this.myForm.getRawValue().email,
      login: this.myForm.getRawValue().login,
      password: this.myForm.getRawValue().password,
      name: this.myForm.getRawValue().userName,
      surname: this.myForm.getRawValue().userSurname,
      patronymic: this.myForm.getRawValue().userPatronymic,
      dateBirth: this.myForm.getRawValue().userDateBirth.getTime(),
      studyGroup: this.myForm.getRawValue().studyGroup,
      role: "STUDENT",
    }
    this.loginservice.addData(newStudent).subscribe();
  };

  createUserRedux() {
    this.store$.dispatch(new TaskCreateUserAction({
        id: "1",
        email: this.myForm.getRawValue().email,
        login: this.myForm.getRawValue().login,
        password: this.myForm.getRawValue().password,
        name: this.myForm.getRawValue().userName,
        surname: this.myForm.getRawValue().userSurname,
        patronymic: this.myForm.getRawValue().userPatronymic,
        dateBirth: this.myForm.getRawValue().userDateBirth.getTime(),
        studyGroup: this.myForm.getRawValue().studyGroup,
        role: "STUDENT",
      })
    )
  }
}

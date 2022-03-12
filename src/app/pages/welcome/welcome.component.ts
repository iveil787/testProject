import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormBuilder} from '@angular/forms';
import {LoginService} from "../../../services/login.service";

// import { Student } from "../models/UserStudents";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
})
export class WelcomeComponent implements OnInit {
  myForm! : FormGroup;

  // Старая форма
  // constructor(){
  //   this.myForm = new FormGroup({
  //     userAllName: new FormGroup({
  //         "userName": new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")]),
  //         "userSurname": new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")]),
  //         "userPatronymic": new FormControl(null, [Validators.required, Validators.pattern("[а-яА-Я a-zA-Z]*")]),
  //       },
  //     ),
  //     "userDateBirth": new FormControl(null, [Validators.required, this.limitAge, Validators.pattern("[^а-яА-Я a-zA-Z]*")]),
  //     "userRating": new FormControl(null, [Validators.required, Validators.maxLength(1), Validators.pattern("[0-5]")]),
  //   });
  // }


  limitAge(control: AbstractControl): ValidationErrors | null {
    const date = new Date();
    const pastDate = new Date(date.setFullYear(date.getFullYear() - 10));
    const inputDate = new Date(control.value);
    if (inputDate > pastDate) {
      return { "recuiredDate<": pastDate.toLocaleDateString(),
        "inputedDate": inputDate.toLocaleDateString() };
    }
    return null;
  }

  // =====================================сабмитим====submitForm()==========================================
  submitForm(): void {
    if (this.myForm.valid) {
      console.log('submit', this.myForm.value);
      // проверки
      this.addStudents();
      this.loginservice.getData();
      this.loginservice.getDatSaerve();
      // console.log(this.myForm.getRawValue().userDateBirth.getTime());

      // this.loginservice.postData(this.myForm.value);
    } else {
      Object.values(this.myForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.myForm.controls["checkPassword"].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.myForm.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder,@Inject(LoginService) private loginservice: LoginService) {}

// =====================================ходим на сервис=====addStudents==========================================
  addStudents(): void{
    const newStudent = {
      id: this.loginservice.modelUserStudent.length + 1,
      email: this.myForm.getRawValue().email,
      login: this.myForm.getRawValue().login,
      password: this.myForm.getRawValue().password,
      checkPassword: this.myForm.getRawValue().checkPassword,
      userName: this.myForm.getRawValue().userName,
      userSurname: this.myForm.getRawValue().userSurname,
      userPatronymic: this.myForm.getRawValue().userPatronymic,
      userDateBirth: this.myForm.getRawValue().userDateBirth.getTime(),
      studyGroup: this.myForm.getRawValue().studyGroup,
    }
    this.loginservice.addData(newStudent);
  };
  // this.myForm.getRawValue('userDateBirth').userDateBirth.toGMTString()
  //
  // console.log(this.myForm.getRawValue().userDateBirth.getTime())

// =====================================Validators=====ngOnInit()-==========================================
  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      userName: [null, [Validators.required], ],
      userSurname: [null, [Validators.required]],
      userPatronymic: [null, [Validators.required]],
      userDateBirth: [null],
      studyGroup: [null, [Validators.required]],
      // nickname: [null, [Validators.required]],
      // nickname: [null, [Validators.required]],
      // nickname: [null, [Validators.required]],
      // phoneNumberPrefix: ['+86'],
      // phoneNumber: [null, [Validators.required]],
      // website: [null, [Validators.required]],
      // captcha: [null, [Validators.required]],
      // agree: [false]
    });
  }

}

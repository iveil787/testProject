import {Component, Inject, OnInit, OnChanges, SimpleChanges, DoCheck} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormBuilder} from '@angular/forms';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

// import { Student } from "../models/UserStudents";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
})
export class WelcomeComponent implements OnInit, OnChanges, DoCheck {

  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService, private router: Router) {
  }

  myForm!: FormGroup;

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
      return {
        "recuiredDate<": pastDate.toLocaleDateString(),
        "inputedDate": inputDate.toLocaleDateString()
      };
    }
    return null;
  }

  // =====================================сабмитим====submitForm()==========================================
  submitForm(): void {
    if (this.myForm.valid) {
      console.log('submit', this.myForm.value);
      // проверки
      // this.loginservice.getData();
      // this.loginservice.getDatSaerve();
      // console.log(this.myForm.getRawValue().userDateBirth.getTime());
      // this.loginservice.postData(this.myForm.value);

      // добввление на сервер студента

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
    /** wait for refresh value */
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

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }


// =====================================ходим на сервис=====addStudents==========================================
  addStudents(): void {
    const newStudent = {
      id: this.loginservice.modelUserStudent.length + 1,
      email: this.myForm.getRawValue().email,
      login: this.myForm.getRawValue().login,
      password: this.myForm.getRawValue().password,
      name: this.myForm.getRawValue().userName,
      surname: this.myForm.getRawValue().userSurname,
      patronymic: this.myForm.getRawValue().userPatronymic,
      dateBirth: this.myForm.getRawValue().userDateBirth.getTime(),
      studyGroup: this.myForm.getRawValue().studyGroup,
    }
    this.loginservice.addData(newStudent).subscribe();
  };

  // id: number;
  // email: string;
  // login: string;
  // password: string;
  // name: string;
  // surname: string;
  // patronymic: string;
  // dateBirth: number;
  // studyGroup: string;

  // this.myForm.getRawValue('userDateBirth').userDateBirth.toGMTString()
  //
  // console.log(this.myForm.getRawValue().userDateBirth.getTime())
  // =====================================Навигация=====ngOnInit()-==========================================
  gologin() {

    this.router.navigate(['login']);
  }

  goHome() {

    this.router.navigate(['welcome']);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes")
  }
  ngDoCheck() {
    this.loginservice.checkToken()
  }

// =====================================Validators=====ngOnInit()-==========================================
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


}

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ROLES, Student} from "../../../../models/UserStudents";
import {LoginService} from "../../../../services/login.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {CountState} from "../../../reducers/count/count.reducer";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit ,OnDestroy{

  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService,
              private store$: Store<CountState>) {
  }
  currentUser: Student | undefined;
  subscription: any
  roleAdmin = ROLES.ADMIN


  myForm!: FormGroup;

  ngOnInit(): void {

    this.getCurrentUser()

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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getCurrentUser() {
    this.subscription = this.loginservice.currentUser().subscribe((data: Student[]) => (this.currentUser = data[0]));

  }

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

      this.addDataTeacher();
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

// ==========================================addStudents==========================================
//   этот метод работает напрямую с сервисом;
  addDataTeacher(): void {
    const newStudent = {
      id:  "1",
      email: this.myForm.getRawValue().email,
      login: this.myForm.getRawValue().login,
      password: this.myForm.getRawValue().password,
      name: this.myForm.getRawValue().userName,
      surname: this.myForm.getRawValue().userSurname,
      patronymic: this.myForm.getRawValue().userPatronymic,
      dateBirth: this.myForm.getRawValue().userDateBirth.getTime(),
      studyGroup: this.myForm.getRawValue().studyGroup,
      role:  "TEACHER",
    }
    this.loginservice.addDataTeacher(newStudent).subscribe();
  };

}

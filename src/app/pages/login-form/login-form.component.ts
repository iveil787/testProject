import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {Student} from "../../../models/UserStudents";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {TaskloginUserAction} from "../../reducers/redux-login/login.actoins";
import {ErrorsList} from "../../reducers/errors/error.reduser";
import {NzMessageService} from "ng-zorro-antd/message";
import {selectError} from "../../reducers/errors/error.selectors";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService, private router: Router
    , private store$: Store<Student>, private error$: Store<ErrorsList>, private message: NzMessageService
  ) {
  }

  public errore$: Observable<string> = this.error$.pipe(select(selectError));

  validateForm!: FormGroup;

  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  submitForm(): void {

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.loginServiceRedux();
      this.loginservice.checkToken();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  loginServiceRedux() {
    this.store$.dispatch(new TaskloginUserAction({
        login: this.validateForm.getRawValue().login,
        password: this.validateForm.getRawValue().password,
      })
    )
  }

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

}

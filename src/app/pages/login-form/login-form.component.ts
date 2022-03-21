import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {Student} from "../../../models/UserStudents";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService, private router: Router) {
  }
  validateForm!: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnDestroy() {
// .unsubscribe();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.loginservice.getLoginSaerve(this.validateForm.getRawValue().login, this.validateForm.getRawValue().password).subscribe((data: Student[]) => {
        localStorage.setItem("token", JSON.stringify({id: data[0].id, time: new Date()}))
        this.router.navigate(['home']);
      });
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
}

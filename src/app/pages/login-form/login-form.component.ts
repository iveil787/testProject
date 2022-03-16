import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.loginservice.getLoginSaerve(this.validateForm.getRawValue().login,this.validateForm.getRawValue().password)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder,@Inject(LoginService) private loginservice: LoginService) {}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // remember: [true]
    });
  }

}

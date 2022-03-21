import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../../../services/login.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;

  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService) {
  }

  ngOnInit(): void {
    this.loginservice.checkToken()
  }

}

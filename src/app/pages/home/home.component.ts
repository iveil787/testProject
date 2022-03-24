import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {Student} from "../../../models/UserStudents";
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  data: Student[] | undefined;
  subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService) {
  }

  ngOnInit(): void {
    this.loginservice.checkToken()
    this.currentUser();

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logOut() {
    this.loginservice.logOut();
  }

  currentUser() {
    this.subscription = this.loginservice.currentUser().subscribe((data: Student[]) => (this.data = data));
  }
}

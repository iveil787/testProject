import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ROLES, Student} from "../../../../models/UserStudents";
import {LoginService} from "../../../../services/login.service";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit ,OnDestroy{

  constructor(@Inject(LoginService) private loginservice: LoginService) {
  }
  currentUser: Student | undefined;
  subscription: any
  roleAdmin = ROLES.ADMIN



  ngOnInit(): void {
    this.getCurrentUser()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



  getCurrentUser() {
    this.subscription = this.loginservice.currentUser().subscribe((data: Student[]) => (this.currentUser = data[0]));

  }


}

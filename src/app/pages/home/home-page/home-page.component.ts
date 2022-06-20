import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Student} from "../../../../models/UserStudents";
import {LoginService} from "../../../../services/login.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit ,OnDestroy{

  constructor(@Inject(LoginService) private loginservice: LoginService) {
  }
  data: any;
  subscription:any
  ngOnInit(): void {
    this.currentUser()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  currentUser() {
    this.subscription = this.loginservice.currentUser().subscribe((data: Student[]) => (this.data = data));
  }


}

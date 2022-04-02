import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {Student} from "../../../models/UserStudents";
import { map, Observable, Subscription} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {CountState} from "../../reducers/count/count.reducer";
import {selectCount, selectUpdatedAt} from "../../reducers/count/count.selectors";
import {CountClearAction, CountDecreaseAction,} from "../../reducers/count/count.actions";
import {userAddUserAction} from "../../reducers/redux-welcome/register.actions";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  data: Student[] | undefined;
  subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, @Inject(LoginService) private loginservice: LoginService,
              private store$: Store<CountState>) {
  }

  public count$: Observable<number> = this.store$.pipe(select(selectCount));
  public updatedAt$: Observable<number> = this.store$.pipe(select(selectUpdatedAt));
  public  disableDecrease$: Observable<boolean> = this.count$.pipe(map(count => count <= 0));

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

  increment() {
    this.store$.dispatch(new userAddUserAction({
      id: 789789,
      email: "yyy@yandex.ru",
      login: "rr",
      password: "rr",
      name: "rr",
      surname: "rr",
      patronymic: "rr",
      dateBirth: 1648065159780,
      studyGroup: "rr",})
    )
  }

  decrement() {
    this.store$.dispatch(new CountDecreaseAction())
  }

  clear() {
    this.store$.dispatch(new CountClearAction())
  }
}

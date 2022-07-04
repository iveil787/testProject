import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ROLES, Student} from "../../../../models/UserStudents";
import {select, Store} from "@ngrx/store";
import {TaskCreateTableUser} from "../../../reducers/table-user/table.action";
import {Homework, LoginService} from "../../../../services/login.service";
import {tableSelector} from "../../../reducers/table-user/table.selector";
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {tableHomeworkSelector} from "../../../reducers/homework/homework.selector";
import {TaskCreateTableHomeworkActions} from "../../../reducers/homework/homework.action";


@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.less']
})
export class TableUserComponent implements OnInit, OnDestroy {

  constructor(@Inject(LoginService) private loginservice: LoginService, private store$: Store<Student>,
              private route: ActivatedRoute, private HomeWorkStore$: Store<Homework>) {
  }

  listOfData: Homework[] = [];

  public tableHomeworkDate$: Observable<Homework[]> = this.HomeWorkStore$.pipe(select(tableHomeworkSelector));

  public tableDate$: Observable<Student[]> = this.store$.pipe(select(tableSelector));

  id: any;

  sub: any;

  visiblePopover: boolean = false;

  visible = false;

  roleTeacher = ROLES.TEACHER;

  ngOnInit(): void {
    this.store$.dispatch(new TaskCreateTableHomeworkActions())
    this.taskTableUser()

    this.tableHomeworkDate$.subscribe((allHomework) => {
      this.listOfData = allHomework
    })

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goInToTheServ() {
    this.tableDate$
  }

  taskTableUser() {
    this.store$.dispatch(new TaskCreateTableUser()
    )
  }

  filterHW(userID: string) {
    return this.tableHomeworkDate$.pipe(map((HW) =>
      (HW.filter((item) => (userID === item.nicknameStudent)))))
  }
}

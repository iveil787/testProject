import {Component, Inject, OnInit} from '@angular/core';
import {Student} from "../../../../models/UserStudents";
import {select, Store} from "@ngrx/store";
import {TaskCreateTableUser} from "../../../reducers/table-user/table.action";
import {LoginService} from "../../../../services/login.service";
import {tableSelector} from "../../../reducers/table-user/table.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.less']
})
export class TableUserComponent implements OnInit {

  constructor(@Inject(LoginService) private loginservice: LoginService, private store$: Store<Student>) {
  }

  ngOnInit(): void {
    this.taskTableUser()
    // this.goToServis() зполнить таблицу напрямую из сервиса
    this.tableDate$.subscribe((allUser) => console.log(allUser))
  }

  public tableDate$: Observable<Student[]> = this.store$.pipe(select(tableSelector));

  goInToTheServ() {
    this.tableDate$
  }
  taskTableUser() {
    this.store$.dispatch(new TaskCreateTableUser()
    )
  }

  date: any;

  // listOfData: Student[] = [
  //   {
  //     id: 111,
  //     email: "yyy@yandex.ru",
  //     login: "ww",
  //     password: "ww",
  //     name: "ww",
  //     surname: "ww",
  //     patronymic: "ww",
  //     dateBirth: 1647373728263,
  //     studyGroup: "ww"
  //   },
  //   {
  //     id: 111,
  //     email: "yyy@yandex.ru",
  //     login: "ww",
  //     password: "ww",
  //     name: "ww",
  //     surname: "ww",
  //     patronymic: "ww",
  //     dateBirth: 1647373728263,
  //     studyGroup: "ww"
  //   },
  //   {
  //     id: 111,
  //     email: "yyy@yandex.ru",
  //     login: "ww",
  //     password: "ww",
  //     name: "ww",
  //     surname: "ww",
  //     patronymic: "ww",
  //     dateBirth: 1647373728263,
  //     studyGroup: "ww"
  //   }
  // ];

  // goToServis(): void {
  //   console.log(this.loginservice.getAllUser().subscribe((date) => (this.date = date)));
  //
  // }


}

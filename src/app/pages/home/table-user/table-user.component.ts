import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ROLES, Student} from "../../../../models/UserStudents";
import {select, Store} from "@ngrx/store";
import {TaskCreateTableUser} from "../../../reducers/table-user/table.action";
import {Homework, LoginService} from "../../../../services/login.service";
import {tableSelector} from "../../../reducers/table-user/table.selector";
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {tableHomeworkSelector} from "../../../reducers/homework/homework.selector";


interface HomeWork {
  idWomeHork: number;
  idUser: number;
  nameHw: string;
  case: string;
  date: number;
}

export interface StudentTest {
  id: number;
  email: string;
  login: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  dateBirth: number;
  studyGroup: string;
  visiblePopover: boolean
}

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.less']
})
export class TableUserComponent implements OnInit, OnDestroy {

  constructor(@Inject(LoginService) private loginservice: LoginService, private store$: Store<Student>,
              private route: ActivatedRoute, private HomeWorkStore$: Store<HomeWork>) {
  }

  public tableHomeworkDate$: Observable<Homework[]> = this.HomeWorkStore$.pipe(select(tableHomeworkSelector));

  id: any;
  sub: any;
  roleTeacher = ROLES.TEACHER;

  ngOnInit(): void {
    this.taskTableUser()
    // this.goToServis() зполнить таблицу напрямую из сервиса
    // this.tableDate$.subscribe((allUser) => console.log(allUser))

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  homeWork: HomeWork = {
    idWomeHork: 1111,
    idUser: 2222,
    nameHw: "aaaa",
    case: "bbbbbb",
    date: 2222,
  }

  listOfData: StudentTest[] = [
    {
      id: 111,
      email: "yyy@yandex.ru",
      login: "ww",
      password: "ww",
      name: "ww",
      surname: "ww",
      patronymic: "ww",
      dateBirth: 1647373728263,
      studyGroup: "ww",
      visiblePopover: false,
    },
    {
      id: 111,
      email: "yyy@yandex.ru",
      login: "ww",
      password: "ww",
      name: "ww",
      surname: "ww",
      patronymic: "ww",
      dateBirth: 1647373728263,
      studyGroup: "ww",
      visiblePopover: false,
    },
    {
      id: 111,
      email: "yyy@yandex.ru",
      login: "ww",
      password: "ww",
      name: "ww",
      surname: "ww",
      patronymic: "ww",
      dateBirth: 1647373728263,
      studyGroup: "ww",
      visiblePopover: false,
    }
  ];

  // goToServis(): void {
  //   console.log(this.loginservice.getAllUser().subscribe((date) => (this.date = date)));
  //
  // }
  visiblePopover: boolean = false;

  clickMe(): void {
    this.visiblePopover = false;
  }

  change(value: any): void {
    console.log(value);
  }

// ++++++++++++++++++++++++++++++++++
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  saveHW() {
    alert("saveHW")
  }

  filterHW(userID: string) {
    // this.tableHomeworkDate$.pipe(map((HW) => (HW.filter((item) => (userID === item.idTeacher)))))

    return  this.tableHomeworkDate$.pipe(map((HW) => (HW.filter((item) => (userID === item.nicknameStudent)))))
  }

}

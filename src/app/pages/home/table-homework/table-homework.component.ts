import {Component, Inject, OnInit} from '@angular/core';
import {Homework, LoginService} from "../../../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzSelectSizeType} from "ng-zorro-antd/select";
import {v4 as uuidv4} from 'uuid';
import {Student} from "../../../../models/UserStudents";
import {select, Store} from "@ngrx/store";

import {TaskCreateTableHomeworkActions} from "../../../reducers/homework/homework.action";
import {Observable} from "rxjs";

import {tableHomeworkSelector} from "../../../reducers/homework/homework.selector";


interface HomeWork {
  idWomeHork: number;
  idUser: number;
  idStudent: number;
  nameHw: string;
  case: string;
  date: number;
}

// @ts-ignore
@Component({
  selector: 'app-table-homework',
  templateUrl: './table-homework.component.html',
  styleUrls: ['./table-homework.component.less']
})
export class TableHomeworkComponent implements OnInit {

  constructor(@Inject(LoginService) private loginservice: LoginService, private fb: FormBuilder, private store$: Store<HomeWork>) {
  }

  ngOnInit(): void {
    this.taskTableHomework()
    this.tableHomeworkDate$.subscribe((allHomework) => console.log(allHomework))


    this.validateForm = this.fb.group({
      nicknameStudent: [null, [Validators.required]],
      homework: [null, [Validators.required]],
      description: [null, [Validators.required]],
      // select: [null],
      deadline: [null],
      wishes: [null, [Validators.required, Validators.maxLength(10)]],
    });
    console.log(this.validateForm.getRawValue().description)
    this.goTo();
    this.currentUser();
    console.log(this.teacher);

    // ====================================================== selector
    // const children: Array<{ label: string; value: string }> = [];
    // for (let i = 10; i < 36; i++) {
    //   children.push({label: i.toString(36) + i, value: i.toString(36) + i});
    // }
    // this.listOfOption = children;
  }


  public tableHomeworkDate$: Observable<Homework[]> = this.store$.pipe(select(tableHomeworkSelector));

  goInToTheServ() {
    this.tableHomeworkDate$
  }

  taskTableHomework() {
    this.store$.dispatch(new TaskCreateTableHomeworkActions()
    )
  }

  // ====================================================== selector
  currentUser() {
    this.subscription = this.loginservice.currentUser().subscribe((data: Student[]) => (this.teacher = data))
    // this.loginservice.currentUser().subscribe((data: Student[]) => (this.teacher = data));
  }

  addHomework(): void {
    // this.currentUser();
    const newHomework = {
      id: uuidv4(),
      idTeacher: "брать значение из токена",
      nicknameStudent: this.validateForm.getRawValue().nicknameStudent,
      homework: this.validateForm.getRawValue().homework,
      description: this.validateForm.getRawValue().description,
      deadline: this.validateForm.getRawValue().deadline[0].getTime(),
      wishes: this.validateForm.getRawValue().wishes,

    }
    this.loginservice.addHomework(newHomework).subscribe();
    console.log(newHomework);
  };

  // ======================================================

  homeWork: any;

  subscription: any;

  teacher: any;


  listOfData: HomeWork[] = [
    {
      idWomeHork: 1,
      idUser: 11,
      idStudent: 111,
      nameHw: "fggffg",
      case: "string",
      date: 323,
    },
    {
      idWomeHork: 1,
      idUser: 11,
      idStudent: 111,
      nameHw: "fggffg",
      case: "string",
      date: 323,
    },
    {
      idWomeHork: 1,
      idUser: 11,
      idStudent: 111,
      nameHw: "fggffg",
      case: "string",
      date: 323,
    }
  ];


// =========================================================


  validateForm!: FormGroup;


  submitForm(): void {
    if (this.validateForm.valid) {
      this.addHomework();
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }


  // ====================================================goToService
  goTo(): void {
    this.loginservice.getAllHomework().subscribe((data) => (this.homeWork = data))
  }

  // ====================================================visiblePopover
  visiblePopover: boolean = false;

  clickMe(): void {
    this.visiblePopover = false;
  }

  change(value: any): void {
    console.log(value);
  }

  isVisible = false;


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.submitForm()
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  saveHW() {
    alert("saveHW")
  }


// ++++++++++++++++++++++++++++++++++++selector


  listOfOption: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'default';
  singleValue = 'a10';
  multipleValue = ['a10', 'c12'];
  tagValue = ['a10', 'c12', 'tag'];


}

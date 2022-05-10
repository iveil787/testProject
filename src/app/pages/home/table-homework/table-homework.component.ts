import {Component, Inject, OnInit} from '@angular/core';
import {Homework, LoginService} from "../../../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {v4 as uuidv4} from 'uuid';
import {Student} from "../../../../models/UserStudents";
import {select, Store} from "@ngrx/store";
import {
  TaskCreateHomeworkActions,
  TaskCreateTableHomeworkActions, TaskEditHomeworkActions
} from "../../../reducers/homework/homework.action";
import { Observable} from "rxjs";
import {tableHomeworkSelector} from "../../../reducers/homework/homework.selector";
import {tableSelector} from "../../../reducers/table-user/table.selector";



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

  constructor(@Inject(LoginService) private loginservice: LoginService, private fb: FormBuilder,
              private store$: Store<HomeWork>, private list$: Store<Student>) {
  }

  // ==================================переменные ==============================
  validateForm!: FormGroup;

  validateFormDetails!: FormGroup;

  public tableHomeworkDate$: Observable<Homework[]> = this.store$.pipe(select(tableHomeworkSelector));

  homeWork: any;

  subscription: any;

  teacher: any;

  statusTime: any = new Date;

  editHwTest: any;

  selectedValue = null;

  time = new Date();
  // ====================================================== мусор
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

  // ================================== Жизненный цикл ==============================
  ngOnInit(): void {

    this.statusTime.getTime();

    this.taskTableHomework()
    this.tableHomeworkDate$.subscribe((allHomework) => console.log(allHomework))

    this.validateForm = this.fb.group({
      nicknameStudent: [null, [Validators.required]],
      homework: [null, [Validators.required]],
      description: [null, [Validators.required]],
      deadline: [null],
      wishes: [null, [Validators.required, Validators.maxLength(10)]],
    });


    this.validateFormDetails = this.fb.group({
      nicknameStudent: [null, [Validators.required]],
      homework: [null, [Validators.required]],
      description: [null, [Validators.required]],
      deadline: [null],
      wishes: [null, [Validators.required, Validators.maxLength(10)]],
    });


    // this.currentUser() берёт данные Юзера из токена
    this.currentUser();

  }


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

  submitFormDetails(): void {
    if (this.validateFormDetails.valid) {
      this.addEditHomework();
      console.log('submit', this.validateFormDetails.value);
    } else {
      Object.values(this.validateFormDetails.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }


  addHomework(): void {
    // this.currentUser();
    const [startDate, endDate] = this.validateForm.getRawValue().deadline
    const newHomework = {
      id: uuidv4(),
      idTeacher: this.teacher[0].id,
      nicknameStudent: this.validateForm.getRawValue().nicknameStudent,
      homework: this.validateForm.getRawValue().homework,
      description: this.validateForm.getRawValue().description,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      wishes: this.validateForm.getRawValue().wishes,

    }
    // this.loginservice.addHomework(newHomework).subscribe();
    this.taskCreateHWUser(newHomework)


    console.log(newHomework);

    // console.log(this.validateForm.getRawValue().deadline);
  };

  addEditHomework(): void {
    // this.currentUser();
    const [startDate, endDate] = this.validateFormDetails.getRawValue().deadline
    const newEditHomework = {
      id: this.editHwTest.id,
      idTeacher: this.teacher[0].id,
      nicknameStudent: this.editHwTest.nicknameStudent,
      homework: this.editHwTest.homework,
      description: this.validateFormDetails.getRawValue().description,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      wishes: this.validateFormDetails.getRawValue().wishes,
    }
    // this.loginservice.addEditHomework(newEditHomework).subscribe();

    this.taskEditHomework(newEditHomework)
    // console.log(this.validateForm.getRawValue().deadline);
  };

  taskEditHomework(HW: Homework) {
    this.store$.dispatch(new TaskEditHomeworkActions(HW))
  }

  // поход на серв без state
  // goTo(): void {
  //   this.loginservice.getAllHomework().subscribe((data) => (this.homeWork = data))
  // }
  // ====================================================goToService
  goInToTheServ() {
    this.tableHomeworkDate$
  }

  taskTableHomework() {
    this.store$.dispatch(new TaskCreateTableHomeworkActions()
    )
  }

  // ====================================================== попытки получить данные из subscribe
  currentUser() {
    return this.loginservice.currentUser().subscribe((data: Student[]) => {
      this.teacher = data
    })

  }

  // ====================================================visiblePopoverCreate

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

// ====================================================visiblePopoverEdite

  isVisibleDetails = false;

  showModalDetails(): void {
    this.isVisibleDetails = true;
  }

  handleOkDetails(): void {
    console.log('Button ok clicked!');
    this.isVisibleDetails = false;
    this.submitFormDetails()
  }

  handleCancelDetails(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDetails = false;
    this.submitFormDetails()
  }

  editHW(Hw: any): void {
    this.editHwTest = Hw;
    this.validateFormDetails.controls["nicknameStudent"].setValue(Hw?.nicknameStudent);
    this.validateFormDetails.controls["homework"].setValue(Hw?.homework);
    this.validateFormDetails.controls["description"].setValue(Hw?.description);
    this.validateFormDetails.controls["wishes"].setValue(Hw?.wishes);

  }

// ++++++++++++++++++++++++++++++++++++selector 2

  public allUseList$: Observable<Student[]> = this.list$.pipe(select(tableSelector));

  goToUse() {
    this.allUseList$
  }

  // taskTableUser() {
  //   this.list$.dispatch(new TaskCreateTableUser()
  //   )
  // }


  taskCreateHWUser(HW: Homework) {
    this.list$.dispatch(new TaskCreateHomeworkActions(HW)
    )
  }

}

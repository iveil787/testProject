import {Component, Inject, OnInit} from '@angular/core';
import {Homework, LoginService} from "../../../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {v4 as uuidv4} from 'uuid';
import {ROLES, Student} from "../../../../models/UserStudents";
import {select, Store} from "@ngrx/store";
import {
  TaskCreateHomeworkActions,
  TaskCreateTableHomeworkActions, TaskDelletHomeworkActions, TaskEditHomeworkActions
} from "../../../reducers/homework/homework.action";
import {Observable} from "rxjs";
import {filterTeacherHomeworkSelector} from "../../../reducers/homework/homework.selector";
import {tableSelector} from "../../../reducers/table-user/table.selector";
import {TaskCreateTableUser} from "../../../reducers/table-user/table.action";


// @ts-ignore
@Component({
  selector: 'app-table-homework',
  templateUrl: './table-homework.component.html',
  styleUrls: ['./table-homework.component.less']
})
export class TableHomeworkComponent implements OnInit {

  constructor(@Inject(LoginService) private loginservice: LoginService, private fb: FormBuilder,
              private store$: Store<Homework>, private list$: Store<Student>) {
  }

  public allUseList$: Observable<Student[]> = this.list$.pipe(select(tableSelector));

  public tableHomeworkDate$: Observable<Homework[]> = this.store$.pipe(select(filterTeacherHomeworkSelector));

  validateForm!: FormGroup;

  validateFormDetails!: FormGroup;

  subscription: any;

  statusTime: any = new Date;

  editHwTest: any;

  selectedValue = null;

  teacher: Student[] = [];

  roleTeacher = ROLES.TEACHER;

  allUseList: Student[] = [];

  listOfData: Homework[] = [];

  isVisible = false;

  isVisibleDetails = false;

  ngOnInit(): void {
    this.store$.dispatch(new TaskCreateTableUser())
    this.statusTime.getTime()
    this.taskTableHomework()

    this.tableHomeworkDate$.subscribe((allHomework) => this.listOfData = allHomework)
    this.allUseList$.subscribe((allUseList) => this.allUseList = allUseList)

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

    this.currentUser();

  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.addHomework();
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
      status_HW: "Задано",
      nameTeacher: this.teacher[0].name,
      surnameTeacher: this.teacher[0].surname,
      patronymicTeacher: this.teacher[0].patronymic,
      studyTeacher: this.teacher[0].studyGroup,
      emailTeacher: this.teacher[0].email,
      idStudent: this.allUseList.filter((user: Student) => user.name === this.validateForm.getRawValue().nicknameStudent)[0].id,

    }
    this.taskCreateHWUser(newHomework)
  };

  addEditHomework(): void {

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
      status_HW: "Задано",
      nameTeacher: this.teacher[0].name,
      surnameTeacher: this.teacher[0].surname,
      patronymicTeacher: this.teacher[0].patronymic,
      studyTeacher: this.teacher[0].studyGroup,
      emailTeacher: this.teacher[0].email,
      idStudent: this.allUseList.filter((user: Student) => user.name === this.validateForm.getRawValue().nicknameStudent)[0].id,
    }
    this.taskEditHomework(newEditHomework)
  };

  taskEditHomework(HW: Homework) {
    this.store$.dispatch(new TaskEditHomeworkActions(HW))
  }

  taskTableHomework() {
    this.store$.dispatch(new TaskCreateTableHomeworkActions()
    )
  }

  currentUser() {
    return this.loginservice.currentUser().subscribe((data: Student[]) => {
      this.teacher = data
    })
  }

  // =======================================visiblePopoverCreate

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

// =========================================visiblePopoverEdite

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
    this.validateFormDetails.controls["deadline"].setValue([Hw?.startDate,]);
  }

  taskCreateHWUser(HW: Homework) {
    this.list$.dispatch(new TaskCreateHomeworkActions(HW)
    )
  }

  deleteHWRedux(HW: Homework) {
    this.list$.dispatch(new TaskDelletHomeworkActions(HW))
  }
}

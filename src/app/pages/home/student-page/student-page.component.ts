import {Component, Inject, OnInit} from '@angular/core';
import {Homework, LoginService} from "../../../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


import {ROLES, Student} from "../../../../models/UserStudents";
import {select, Store} from "@ngrx/store";
import {

  TaskCreateTableHomeworkActions,

  TaskEditStatusHomeworkActions
} from "../../../reducers/homework/homework.action";
import {map, Observable} from "rxjs";
import {filterStudentHomeworkSelector,} from "../../../reducers/homework/homework.selector";
import {tableSelector} from "../../../reducers/table-user/table.selector";
import {TaskCreateTableUser} from "../../../reducers/table-user/table.action";


// @ts-ignore
@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.less']
})
export class StudentPageComponent implements OnInit {

  constructor(@Inject(LoginService) private loginservice: LoginService, private fb: FormBuilder,
              private store$: Store<Homework>, private list$: Store<Student>, private TeacherStore$: Store<Student>) {
  }

  public tableTacherDate$: Observable<Student[]> = this.TeacherStore$.pipe(select(tableSelector));

  public allUseList$: Observable<Student[]> = this.list$.pipe(select(tableSelector));

  public tableHomeworkDate$: Observable<Homework[]> = this.store$.pipe(select(filterStudentHomeworkSelector));

  validateFormDetails!: FormGroup;

  validateFormDetailsTeacher!: FormGroup;

  subscription: any;

  teacher: Student[] = [];

  statusTime: any = new Date;

  editHwTest: any;

  selectedValue = null;

  roleStudent = ROLES.STUDENT;

  teacherList: Student[] = [];

  listOfData: Homework[] = [];

  isVisible = false;

  isVisibleDetails = false;

  isVisibleDetailsTeacher = false;

  ngOnInit(): void {
    this.store$.dispatch(new TaskCreateTableUser())
    this.tableTacherDate$.subscribe((allUser) => this.teacherList = allUser)
    this.tableHomeworkDate$.subscribe((allHomework) => {
      this.listOfData = allHomework
    })

    this.statusTime.getTime()
    this.taskTableHomework()

    this.validateFormDetails = this.fb.group({
      nicknameStudent: [null, [Validators.required]],
      homework: [null, [Validators.required]],
      description: [null, [Validators.required]],
      deadline: [null],
      wishes: [null, [Validators.required, Validators.maxLength(10)]],
    });

    this.validateFormDetailsTeacher = this.fb.group({
      nicknameTeacher: [null, [Validators.required]],
      surnameTeacher: [null, [Validators.required]],
      patronymicTeacher: [null, [Validators.required]],
      studyTeacher: [null, [Validators.required]],
      emailTeacher: [null, [Validators.required]],
    });
  }


  submitFormDetails(): void {
    if (this.validateFormDetails.valid) {
      this.addEditStatus();
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

  submitFormDetailsTeacher(): void {
    if (this.validateFormDetailsTeacher.valid) {
    } else {
      Object.values(this.validateFormDetailsTeacher.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }


  addEditStatus(): void {
    const [currentTeacher] = this.teacherList.filter((teacher) => (this.editHwTest.idTeacher === teacher.id))
    const [startDate, endDate] = this.validateFormDetails.getRawValue().deadline

    const newEditStatusHomework = {
      id: this.editHwTest.id,
      idTeacher: this.editHwTest.idTeacher,
      nicknameStudent: this.editHwTest.nicknameStudent,
      homework: this.editHwTest.homework,
      description: this.validateFormDetails.getRawValue().description,
      startDate: startDate,
      endDate: endDate,
      wishes: this.validateFormDetails.getRawValue().wishes,
      status_HW: "Сompleted",
      nameTeacher: currentTeacher.name,
      surnameTeacher: currentTeacher.surname,
      patronymicTeacher: currentTeacher.patronymic,
      studyTeacher: currentTeacher.studyGroup,
      emailTeacher: currentTeacher.email,
      idStudent: this.validateFormDetailsTeacher.getRawValue().idStudent,
    }
    this.taskEditStatusHomework(newEditStatusHomework)
  };

  taskEditStatusHomework(HW: Homework) {
    this.store$.dispatch(new TaskEditStatusHomeworkActions(HW))
  }

  taskTableHomework() {
    this.store$.dispatch(new TaskCreateTableHomeworkActions()
    )
  }

// ============================== visiblePopoverEdite

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

  // ========================= visiblePopoverDetailsT ======================

  showModalDetailsTeacher(): void {
    this.isVisibleDetailsTeacher = true;
  }

  handleOkDetailsTeacher(): void {
    console.log('Button ok clicked!');
    this.isVisibleDetailsTeacher = false;
    this.submitFormDetailsTeacher()
  }

  handleCancelDetailsTeacher(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDetailsTeacher = false;
    this.submitFormDetailsTeacher()
  }

  // ==================================================== editHW ======================

  showEditHW(Hw: any): void {
    this.editHwTest = Hw;
    this.validateFormDetails.controls["nicknameStudent"].setValue(Hw?.nicknameStudent);
    this.validateFormDetails.controls["homework"].setValue(Hw?.homework);
    this.validateFormDetails.controls["description"].setValue(Hw?.description);
    this.validateFormDetails.controls["wishes"].setValue(Hw?.wishes);
    this.validateFormDetails.controls["deadline"].setValue([Hw?.startDate, Hw?.endDate]);
  }

  showDetailsTeacher(Hw: any): void {
    this.validateFormDetailsTeacher.controls["nicknameTeacher"].setValue(Hw?.nameTeacher);
    this.validateFormDetailsTeacher.controls["surnameTeacher"].setValue(Hw?.surnameTeacher);
    this.validateFormDetailsTeacher.controls["patronymicTeacher"].setValue(Hw?.patronymicTeacher);
    this.validateFormDetailsTeacher.controls["studyTeacher"].setValue(Hw?.studyTeacher);
    this.validateFormDetailsTeacher.controls["emailTeacher"].setValue(Hw?.emailTeacher);
  }


  filterHW(userID: string) {
    return this.tableTacherDate$.pipe(map((HW) => (HW.filter((item) => (userID === item.id)))))
  }

}

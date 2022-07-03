import {Component, Inject, OnInit} from '@angular/core';
import {Homework, LoginService} from "../../../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


import {ROLES, Student} from "../../../../models/UserStudents";
import {select, Store} from "@ngrx/store";
import {
  TaskCreateHomeworkActions,
  TaskCreateTableHomeworkActions,
  TaskDelletHomeworkActions,
  TaskEditStatusHomeworkActions
} from "../../../reducers/homework/homework.action";
import {map, Observable} from "rxjs";
import {filterStudentHomeworkSelector,} from "../../../reducers/homework/homework.selector";
import {tableSelector} from "../../../reducers/table-user/table.selector";
import {TaskCreateTableUser} from "../../../reducers/table-user/table.action";

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
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.less']
})
export class StudentPageComponent implements OnInit {

  constructor(@Inject(LoginService) private loginservice: LoginService, private fb: FormBuilder,
              private store$: Store<HomeWork>, private list$: Store<Student>, private TeacherStore$: Store<Student>) {
  }

  // ==================================переменные ==============================
  public tableTacherDate$: Observable<Student[]> = this.TeacherStore$.pipe(select(tableSelector));

  filterHW(userID: string) {

    return this.tableTacherDate$.pipe(map((HW) => (HW.filter((item) => (userID === item.id)))))
  }

  validateForm!: FormGroup;

  validateFormDetails!: FormGroup;

  validateFormDetailsTeacher!: FormGroup;

  validateFormDetailsHomework!: FormGroup;

  public tableHomeworkDate$: Observable<Homework[]> = this.store$.pipe(select(filterStudentHomeworkSelector));

  homeWork: any;

  subscription: any;

  teacher: any;

  statusTime: any = new Date;

  editHwTest: any;

  selectedValue = null;

  roleStudent = ROLES.STUDENT;

  teacherList : Student[] = [];


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


// filterHWforTeacher(userId: String){
//
//   return  this.tableHomeworkDate$.pipe(map((all) => (all.filter((item) => ( item.idTeacher === "userId")
//
//   ))))
// }
  // ================================== Жизненный цикл ==============================
  ngOnInit(): void {
    this.store$.dispatch(new TaskCreateTableUser())


    this.tableTacherDate$.subscribe( (allUser) => this.teacherList = allUser)


    this.statusTime.getTime()

    this.taskTableHomework()
    // this.filterHWforTeacher(this.teacher)
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

    this.validateFormDetailsHomework = this.fb.group({
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


    // this.currentUser() берёт данные Юзера из токена
    this.currentUser();

  }


  submitForm(): void {
    if (this.validateForm.valid) {

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
      // отключил изменение формы
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


      // console.log('submit', this.validateFormDetailsTeacher.value);
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
    // this.currentUser();

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
      status_HW: "completed",
      nameTeacher: currentTeacher.name,
      surnameTeacher: currentTeacher.surname,
      patronymicTeacher: currentTeacher.patronymic,
      studyTeacher: currentTeacher.studyGroup,
      emailTeacher: currentTeacher.email,
      idStudent: this.validateFormDetailsTeacher.getRawValue().idStudent,
    }
    // this.loginservice.addEditHomework(newEditHomework).subscribe();

    this.taskEditStatusHomework(newEditStatusHomework)
    // console.log(this.validateForm.getRawValue().deadline);
    // console.log(newEditStatusHomework);
  };

  taskEditStatusHomework(HW: Homework) {
    this.store$.dispatch(new TaskEditStatusHomeworkActions(HW))
  }

  // поход на серв без state
  // goTo(): void {
  //   this.loginservice.getAllHomework().subscribe((data) => (this.homeWork = data))
  // }
  // ====================================================goToService
  // goInToTheServ() {
  //   this.tableHomeworkDate$
  // }

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

  // ==================================================== visiblePopoverDetailsT ======================

  isVisibleDetailsTeacher = false;

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
// ++++++++++++++++++++++++++++++++++++selector 2

  public allUseList$: Observable<Student[]> = this.list$.pipe(select(tableSelector));

  goToUse() {
    this.allUseList$
  }

  taskCreateHWUser(HW: Homework) {
    this.list$.dispatch(new TaskCreateHomeworkActions(HW)
    )
  }

  deleteHW(idHW: Homework) {
    this.loginservice.deleteHW(idHW).subscribe()
    console.log(idHW);
  }

  deleteHWRedux(HW: Homework) {
    this.list$.dispatch(new TaskDelletHomeworkActions(HW))
  }

}

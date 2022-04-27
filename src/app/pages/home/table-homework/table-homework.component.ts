import {Component, Inject, OnInit} from '@angular/core';
import {StudentTest} from "../table-user/table-user.component";
import {LoginService} from "../../../../services/login.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzFormTooltipIcon} from "ng-zorro-antd/form";
import {NzSelectSizeType} from "ng-zorro-antd/select";


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

  constructor(@Inject(LoginService) private loginservice: LoginService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nickname: [null, [Validators.required]],
      homework: [null, [Validators.required]],
      description: [null, [Validators.required]],
      // select: [null, [Validators.required]],
      deadline: [null],
    });
    console.log(this.validateForm.getRawValue().description)
    this.goTo();

    // ====================================================== selector
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({label: i.toString(36) + i, value: i.toString(36) + i});
    }
    this.listOfOption = children;
  }


  homeWork: any;

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
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
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

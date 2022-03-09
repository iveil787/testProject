import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { WelcomeComponent } from './welcome.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }

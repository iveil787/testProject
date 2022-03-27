import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';

import { ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginService } from "../services/login.service";
import { LoginFormComponent } from './pages/login-form/login-form.component';
import {NzInputModule} from "ng-zorro-antd/input";
import { HomeComponent } from './pages/home/home.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzPopoverModule} from "ng-zorro-antd/popover";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NzButtonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzFormModule,
    NzMenuModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    NzInputModule,
    NzAvatarModule,
    NzPopoverModule
  ],
  providers: [[LoginService],{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

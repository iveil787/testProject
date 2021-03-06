import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {CommonModule, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LoginService} from "../services/login.service";
import {LoginFormComponent} from './pages/login-form/login-form.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {HomeComponent} from './pages/home/home.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {metaReducers, reducers} from './reducers/store-redux';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {loginEffects} from "./reducers/redux-login/login.effects";
import {NzMessageService} from "ng-zorro-antd/message";
import {TableUserComponent} from './pages/home/table-user/table-user.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {TableUserEffects} from "./reducers/table-user/table.effects";
import {TableHomeworkComponent} from './pages/home/table-homework/table-homework.component';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {HomeworkEffects} from "./reducers/homework/homework.effects";
import {HomePageComponent} from './pages/home/home-page/home-page.component';
import {RolePipe} from "../services/role.pipe";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {StudentPageComponent} from './pages/home/student-page/student-page.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {WelcomeComponent} from "./pages/welcome/welcome.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    TableUserComponent,
    TableHomeworkComponent,
    HomePageComponent,
    RolePipe,
    StudentPageComponent,
    WelcomeComponent
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
    EffectsModule.forRoot([loginEffects, TableUserEffects, HomeworkEffects]),
    NzInputModule,
    NzAvatarModule,
    NzPopoverModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    NzTableModule,
    NzBadgeModule,
    NzDropDownModule,
    NzDividerModule,
    NzDatePickerModule,
    NzDrawerModule,
    NzModalModule,
    NzRadioModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTypographyModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzDatePickerModule,
    CommonModule,
  ],
  providers: [[LoginService, NzMessageService, RolePipe], {provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

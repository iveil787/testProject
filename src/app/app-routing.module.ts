import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginFormComponent} from "./pages/login-form/login-form.component";
import {HomeComponent} from "./pages/home/home.component";
import {TableUserComponent} from "./pages/home/table-user/table-user.component";
import {TableHomeworkComponent} from "./pages/home/table-homework/table-homework.component";
import {HomePageComponent} from "./pages/home/home-page/home-page.component";
import {StudentPageComponent} from "./pages/home/student-page/student-page.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";

const routes: Routes = [

  {path: 'testProject', pathMatch: 'full', redirectTo: 'testProject/login'},

  {path: 'testProject/welcome', component: WelcomeComponent},

  {path: 'testProject/login', component: LoginFormComponent},
  {
    path: 'testProject/home', component: HomeComponent, children: [
      {path: '', redirectTo: 'table-user', pathMatch: 'full'},
      {path: 'table-user', component: TableUserComponent},
      {path: 'table-homework', component: TableHomeworkComponent},
      {path: 'home-page', component: HomePageComponent},
      {path: 'student-page', component: StudentPageComponent},
    ]
  },

  {path: '', pathMatch: 'full', redirectTo: 'testProject/login'},
  {path: '**', redirectTo: 'testProject/login'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

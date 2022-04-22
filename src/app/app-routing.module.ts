import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginFormComponent} from "./pages/login-form/login-form.component";
import {HomeComponent} from "./pages/home/home.component";
import {TableUserComponent} from "./pages/home/table-user/table-user.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},

  {path: 'login', component: LoginFormComponent},
  {
    path: 'home', component: HomeComponent, children: [

      {path: '', redirectTo: 'table-user', pathMatch: 'full'},
      {path: 'table-user', component: TableUserComponent}
    ]
  },

  {path: '', pathMatch: 'full', redirectTo: '/login'},

];

// const appRoutes : Routes = [
//   {path: 'home' component: HomeComponent children: routes
//   }
//
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

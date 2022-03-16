import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFormComponent} from "./pages/login-form/login-form.component";
// import {WelcomeComponent} from "./pages/welcome/welcome.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  // { path: 'logon', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
  // дишрад маршрут
  { path: 'login', component: LoginFormComponent },

   // условие при котором мы попадаем на login
  { path: '', pathMatch: 'full', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

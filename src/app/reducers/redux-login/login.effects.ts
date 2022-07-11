import {Inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FindUserAction, loginUserActions} from "./login.actoins";
import {LoginService} from "../../../services/login.service";
import {map, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {TaskErrorsActions} from "../errors/error.action";


@Injectable()
export class loginEffects {
  constructor(private actions$: Actions, private router: Router,
              @Inject(LoginService) private loginservice: LoginService) {
  }


  test2Effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserActions.taskloginUserRedux),
      switchMap((action: any) => {

        console.log(action.payload);

        return this.loginservice.getLoginService(action.payload.login, action.payload.password)
          .pipe(map((user) => {
              console.log(user);

              const [currentUser] = user

              if (currentUser) {
                localStorage.setItem("token", JSON.stringify({id: currentUser.id, time: new Date(), role:currentUser.role}));
                this.router.navigate(['testProject/home']);
                return new FindUserAction(currentUser)
              } else {
                this.loginservice.createMessage('error')
                return new TaskErrorsActions()
              }
            }
          ))
      })
    )
  );
}


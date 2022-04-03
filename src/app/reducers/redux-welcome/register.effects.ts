import {Inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerUserActions, SuccessCreateUserAction} from "./register.actions";
import {LoginService} from "../../../services/login.service";
import {map, switchMap} from "rxjs";

@Injectable()
export class RegisterUserEffects {
  constructor(private actions$: Actions,
              @Inject(LoginService) private loginservice: LoginService) {
  }

  testEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUserActions.taskCreateUserRedux),
      switchMap((action) => {
        // @ts-ignore
        return this.loginservice.addData(action.payload).pipe(map(() => new SuccessCreateUserAction(action.payload)))
      })
    )
  );
}


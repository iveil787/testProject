import {Inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LoginService} from "../../../services/login.service";
import {map, switchMap} from "rxjs";
import {SuccessCreateTableUserAction, UserActions} from "./table.action";
import {Student} from "../../../models/UserStudents";

@Injectable()
export class TableUserEffects {
  constructor(private actions$: Actions,
              @Inject(LoginService) private loginservice: LoginService) {
  }

// ===================================Эффект для регистрации====================================
  testEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.taskCreateUserRedux),
      switchMap((action) => {
        // @ts-ignore
        return this.loginservice.addData(action.payload).pipe(map(() => new SuccessCreateUserAction(action.payload)))
      })
    )
  );

// ===================================Эффект для tableUser====================================

  TableUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.taskCreateTableUser),
      switchMap(() => {
        // @ts-ignore
        return this.loginservice.getAllUser().pipe(map((users: Student[]) => new SuccessCreateTableUserAction(users)))
      })
    )
  );

  // effectName$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(tableUserActions.taskCreateTableUser),
  //     map((users:any) =>  new SuccessCreateTableUserAction(users))
  //   )
  // );
  //

}

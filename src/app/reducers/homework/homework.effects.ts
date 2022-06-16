import {Inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Homework, LoginService} from "../../../services/login.service";
import {map, switchMap} from "rxjs";
import {
  HomeworkActions,
  SuccessCreateHomeworkActions,
  SuccessCreateTableHomeworkActions, SuccessDelletHomeworkActions,
  SuccessEditHomeworkActions
} from "./homework.action";

@Injectable()
export class HomeworkEffects {
  constructor(private actions$: Actions,
              @Inject(LoginService) private loginservice: LoginService) {
  }

// ===================================Эффект для регистрации====================================
  createHomeworkEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeworkActions.taskCreateHomeworkActions),
      switchMap((action) => {
        // @ts-ignore
        return this.loginservice.addHomework(action.payload).pipe(map(() => new SuccessCreateHomeworkActions(action.payload)))
      })
    )
  );

// ===================================Эффект для tableUser====================================

  TableHomeworkEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeworkActions.taskCreateTableHomeworkActions),
      switchMap(() => {
        // @ts-ignore
        return this.loginservice.getAllHomework().pipe(map((homework: Homework[]) => new SuccessCreateTableHomeworkActions(homework)))
      })
    )
  );

 editHWEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeworkActions.taskEditHomeworkActions),
      switchMap((action) => {
        // @ts-ignore

        return this.loginservice.addEditHomework(action.payload).pipe(map(() => new SuccessEditHomeworkActions(action.payload)))
      })
    )
  );

  delletHWEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeworkActions.taskDelletHomeworkActions),
      switchMap((action) => {
        // @ts-ignore

        return this.loginservice.deleteHW(action.payload).pipe(map(() => new SuccessDelletHomeworkActions(action.payload)))
      })
    )
  );

}

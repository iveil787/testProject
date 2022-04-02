import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {countActionsType, CountUpdatedAtAction} from "./count.actions";
import {map} from "rxjs";

@Injectable()
export class CountEffects {
  constructor(private actions$: Actions) {
  }

  // Срать его на оборот в три прогиба блять ! Юзай createEffect
  @Effect()
  updatedAt$() {
    return this.actions$.pipe(
      ofType(countActionsType.increase, countActionsType.decrease, countActionsType.clear),
      map(() => {
        return new CountUpdatedAtAction({
          updatedAt: Date.now()
        });
      })
    );
  }

}

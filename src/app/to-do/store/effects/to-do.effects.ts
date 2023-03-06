import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Todo } from '../../models/todo.models';
import { TodoRestService } from '../../services/todo-rest.service';
import {
  LoadTodos,
  LoadTodosFailure,
  LoadTodosSuccess,
} from '../actions/to-do.actions';

@Injectable()
export class ToDoEffects {
  constructor(
    private actions$: Actions,
    private todoRestService: TodoRestService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadTodos),
      switchMap(() =>
        this.todoRestService.todos$.pipe(
          map((data: Todo[]) => LoadTodosSuccess({ data })),
          catchError((error) => of(LoadTodosFailure({ error })))
        )
      )
    )
  );
}

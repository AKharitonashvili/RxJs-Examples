import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Todo } from '../../models/todo.models';
import { TodoRestService } from '../../services/todo-rest.service';
import {
  DeleteTodo,
  DeleteTodoSuccess,
  LoadTodos,
  LoadTodosFailure,
  LoadTodosSuccess,
  SetTodoLoading,
} from '../actions/todo.actions';

@Injectable()
export class ToDoEffects {
  constructor(private actions$: Actions, private rest: TodoRestService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadTodos),
      switchMap(() =>
        this.rest.todos$.pipe(
          map((data: Todo[]) => LoadTodosSuccess({ data })),
          catchError((error) => of(LoadTodosFailure({ error })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteTodo),
      switchMap((action) =>
        this.rest.deleteTodo(action.id).pipe(
          map(() => DeleteTodoSuccess({ id: action.id })),
          catchError(() =>
            of(SetTodoLoading({ id: action.id, loading: false }))
          )
        )
      )
    )
  );
}

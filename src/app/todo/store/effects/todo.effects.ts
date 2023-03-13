import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { Todo } from '../../models/todo.models';
import { TodoRestService } from '../../services/todo-rest.service';
import {
  AddTodo,
  AddTodoSuccess,
  DeleteTodo,
  DeleteTodoSuccess,
  LoadTodos,
  LoadTodosFailure,
  LoadTodosSuccess,
  ModifyTodo,
  ModifyTodoSuccess,
  SetTodoLoading,
} from '../actions/todo.actions';

@Injectable()
export class ToDoEffects {
  constructor(
    private actions$: Actions,
    private rest: TodoRestService,
    private store: Store
  ) {}

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
      tap((action) =>
        this.store.dispatch(SetTodoLoading({ id: action.id, loading: true }))
      ),
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

  modifyTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ModifyTodo),
      tap((action) =>
        this.store.dispatch(
          SetTodoLoading({ id: action.todo.id, loading: true })
        )
      ),
      switchMap((action) =>
        this.rest.modifyTodo(action.todo).pipe(
          tap((todo) =>
            this.store.dispatch(SetTodoLoading({ id: todo.id, loading: false }))
          ),
          map((todo) => ModifyTodoSuccess({ todo })),
          catchError(() =>
            of(SetTodoLoading({ id: action.todo.id, loading: false }))
          )
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddTodo),
      tap((action) =>
        this.store.dispatch(
          SetTodoLoading({ id: action.todo.id, loading: false })
        )
      ),
      switchMap((action) =>
        this.rest.addTodo(action.todo).pipe(
          tap(() =>
            this.store.dispatch(
              SetTodoLoading({ id: action.todo.id, loading: false })
            )
          ),
          catchError(() =>
            of(this.store.dispatch(DeleteTodo({ id: action.todo.id })))
          ),
          map(() => AddTodoSuccess({ todo: action.todo })),
        )
      )
    )
  );
}

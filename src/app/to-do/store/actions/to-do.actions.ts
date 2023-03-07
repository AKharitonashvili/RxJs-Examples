import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo.models';

export const LoadTodos = createAction('[TODO] Load Data');
export const LoadTodosSuccess = createAction(
  '[TODO] Load Data Success',
  props<{ data: Todo[] }>()
);
export const LoadTodosFailure = createAction(
  '[TODO] Load Data Failure',
  props<{ error: HttpErrorResponse }>()
);
export const DeleteTodo = createAction(
  '[TODO] Delete Todo',
  props<{ id: number }>()
);
export const ModifyTodo = createAction(
  '[TODO] Modify Todo',
  props<{ todo: Todo }>()
);

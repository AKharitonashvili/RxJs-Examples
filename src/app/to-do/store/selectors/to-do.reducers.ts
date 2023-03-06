import { createSelector } from '@ngrx/store';
import { AppState, TodosState } from '../../models/todo.models';

export const selectTodosState = (state: AppState) => state.todos;
export const selectTodosData = createSelector(
  selectTodosState,
  (state: TodosState) => state.data
);

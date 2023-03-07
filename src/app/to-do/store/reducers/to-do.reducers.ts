import { createReducer, on } from '@ngrx/store';
import { Todo, TodosState } from '../../models/todo.models';
import {
  DeleteTodo,
  LoadTodos,
  LoadTodosFailure,
  LoadTodosSuccess,
  ModifyTodo,
} from '../actions/to-do.actions';

export const InitialTodosState: TodosState = {
  data: [],
  loading: false,
  error: null,
};

export const TodosDataReducer = createReducer(
  InitialTodosState,
  on(LoadTodos, (state: TodosState) => ({ ...state, loading: true })),
  on(LoadTodosSuccess, (state: TodosState, { data }) => ({
    ...state,
    data,
    loading: false,
  })),
  on(LoadTodosFailure, (state: TodosState, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(DeleteTodo, (state: TodosState, { id }) => ({
    ...state,
    data: state.data.filter((data: Todo) => data.id !== id),
  })),
  on(ModifyTodo, (state: TodosState, { todo }) => ({
    ...state,
    data: state.data.map((data: Todo) => {
      if (data.id === todo.id) {
        return todo;
      }
      return data;
    }),
  }))
);

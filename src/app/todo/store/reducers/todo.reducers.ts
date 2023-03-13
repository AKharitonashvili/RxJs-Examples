import { createReducer, on } from '@ngrx/store';
import { Todo, TodosState } from '../../models/todo.models';
import {
  AddTodoSuccess,
  DeleteTodoSuccess,
  LoadTodos,
  LoadTodosFailure,
  LoadTodosSuccess,
  ModifyTodoSuccess,
  SetTodoLoading,
} from '../actions/todo.actions';

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
  on(DeleteTodoSuccess, (state: TodosState, { id }) => ({
    ...state,
    data: state.data.filter((data: Todo) => data.id !== id),
  })),
  on(ModifyTodoSuccess, (state: TodosState, { todo }) => ({
    ...state,
    data: state.data.map((data: Todo) => {
      if (data.id === todo.id) {
        return todo;
      }
      return data;
    }),
  })),
  on(AddTodoSuccess, (state: TodosState, { todo }) => ({
    ...state,
    data: [...state.data, todo],
  })),
  on(SetTodoLoading, (state: TodosState, { id, loading }) => ({
    ...state,
    data: state.data.map((data: Todo) => {
      if (data.id === id) {
        return { ...data, loading };
      }
      return data;
    }),
  }))
);

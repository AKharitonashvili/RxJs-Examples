import { createReducer, on } from '@ngrx/store';
import { TodosState } from '../../models/todo.models';
import {
  LoadTodos,
  LoadTodosFailure,
  LoadTodosSuccess,
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
  }))
);

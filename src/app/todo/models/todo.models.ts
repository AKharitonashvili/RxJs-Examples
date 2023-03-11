import { HttpErrorResponse } from '@angular/common/http';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  loading?: boolean;
}

export interface TodosState {
  data: Todo[];
  loading: boolean;
  error: HttpErrorResponse;
}

export interface AppState {
  todos: TodosState;
}

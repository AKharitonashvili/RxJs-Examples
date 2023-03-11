import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class TodoRestService {
  public todos$: Observable<Todo[]>;

  constructor(private http: HttpClient) {
    this.todos$ = this.getTodos();
  }

  public deleteTodo(id: number): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:3000/todos/${id}`)
      .pipe(delay(5000));
  }

  public addTodo(todo: Todo): Observable<void> {
    return this.http
      .post<void>(`http://localhost:3000/todos/`, todo)
      .pipe(delay(1000));
  }

  public modifyTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(
      `http://localhost:3000/todos/${todo.id}`,
      todo
    );
  }

  private getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('http://localhost:3000/todos')
      .pipe(delay(1000));
  }
}

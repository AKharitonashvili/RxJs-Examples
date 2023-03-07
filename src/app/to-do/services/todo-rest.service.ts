import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  combineLatest,
  Observable,
  Subject,
  take,
  map,
  startWith,
  tap,
} from 'rxjs';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class TodoRestService {
  public todos$: Observable<Todo[]>;
  private updateTodos$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.todos$ = combineLatest(
      this.getTodos(),
      this.updateTodos$.pipe(startWith(null))
    ).pipe(
      map(([todos, isChanged]) => {
        return todos;
      })
    );
  }

  public deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/todos/${id}`);
  }

  public modifyTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(
      `http://localhost:3000/todos/${todo.id}`,
      todo
    );
  }

  private getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }
}

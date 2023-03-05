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
  private updateTodos$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.todos$ = combineLatest(
      this.getTodos(),
      this.updateTodos$.pipe(startWith(null))
    ).pipe(
      map(([todos]) => {
        return todos;
      })
    );
  }

  public deleteTodo(id: number) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(
        take(1),
        tap(() => this.updateTodos$.next())
      )
      .subscribe();
  }

  private getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }
}

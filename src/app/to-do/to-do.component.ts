import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { Todo } from './models/todo.models';
import { TodoRestService } from './services/todo-rest.service';
import { DeleteTodo, LoadTodos } from './store/actions/to-do.actions';
import { selectTodosData } from './store/selectors/to-do.reducers';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  public todos$: Observable<Todo[]>;

  constructor(private rest: TodoRestService, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(LoadTodos());

    this.todos$ = this.store.select(selectTodosData);
  }

  public delete(id: number) {
    this.rest
      .deleteTodo(id)
      .pipe(
        take(1),
        tap(() => this.store.dispatch(DeleteTodo({ id })))
      )
      .subscribe();
  }
}

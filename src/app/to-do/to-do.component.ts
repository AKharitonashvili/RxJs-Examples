import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.models';
import { TodoRestService } from './services/todo-rest.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  public todos$: Observable<Todo[]>;

  constructor(private rest: TodoRestService) {}

  ngOnInit() {
    this.todos$ = this.rest.todos$;
  }

  public delete(id: number) {
    this.rest.deleteTodo(id);
  }
}

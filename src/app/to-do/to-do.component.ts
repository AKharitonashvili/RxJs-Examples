import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import { Todo } from './models/todo.models';
import { TodoRestService } from './services/todo-rest.service';
import {
  AddTodo,
  DeleteTodo,
  LoadTodos,
  ModifyTodo,
} from './store/actions/to-do.actions';
import { selectTodosData } from './store/selectors/to-do.reducers';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  public formGroup: FormGroup;
  public todos$: Observable<Todo[]>;

  constructor(
    private rest: TodoRestService,
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      addTodoControl: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.store.dispatch(LoadTodos());

    this.todos$ = this.store.select(selectTodosData);
  }

  public delete(id: number): void {
    this.rest
      .deleteTodo(id)
      .pipe(
        take(1),
        tap(() => this.store.dispatch(DeleteTodo({ id })))
      )
      .subscribe();
  }

  public modify(todo: Todo): void {
    const modifiedTodo: Todo = { ...todo, completed: !todo.completed };
    this.rest
      .modifyTodo(modifiedTodo)
      .pipe(
        take(1),
        tap(() => this.store.dispatch(ModifyTodo({ todo: modifiedTodo })))
      )
      .subscribe();
  }

  public addTodo(): void {
    const todo: Todo = {
      id: Math.random(),
      title: this.formGroup.get('addTodoControl').value as string,
      userId: 1,
      completed: false,
    };
    this.rest
      .addTodo(todo)
      .pipe(
        take(1),
        tap(() => this.store.dispatch(AddTodo({ todo }))),
        tap(() => this.formGroup.get('addTodoControl').reset())
      )
      .subscribe();
  }
}

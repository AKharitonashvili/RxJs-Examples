import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import { Todo, TodosState } from './models/todo.models';
import { TodoRestService } from './services/todo-rest.service';
import {
  AddTodo,
  DeleteTodo,
  LoadTodos,
  ModifyTodo,
  SetTodoLoading,
} from './store/actions/todo.actions';
import { selectTodosData } from './store/selectors/todo.reducers';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  public formGroup: FormGroup;
  public todos$: Observable<TodosState>;

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
    this.store.dispatch(DeleteTodo({ id }));
  }

  public modify(todo: Todo): void {
    this.store.dispatch(
      ModifyTodo({
        todo: { ...todo, completed: !todo.completed },
      })
    );
  }

  public addTodo(): void {
    this.store.dispatch(
      AddTodo({
        todo: {
          id: Math.random(),
          title: this.formGroup.get('addTodoControl').value as string,
          userId: 1,
          completed: false,
        },
      })
    );
  }
}

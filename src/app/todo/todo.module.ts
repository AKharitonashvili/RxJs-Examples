import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TodoRestService } from './services/todo-rest.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TodoComponent],
  providers: [TodoRestService],
})
export class TodoModule {}

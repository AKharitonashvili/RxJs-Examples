import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoComponent } from './to-do.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TodoRestService } from './services/todo-rest.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToDoEffects } from './store/effects/to-do.effects';
import { TodosDataReducer } from './store/reducers/to-do.reducers';

const routes: Routes = [
  {
    path: '',
    component: ToDoComponent,
  },
];

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
  declarations: [ToDoComponent],
  providers: [TodoRestService],
})
export class ToDoModule {}

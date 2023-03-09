import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoEffects } from './todo/store/effects/todo.effects';
import { TodosDataReducer } from './todo/store/reducers/todo.reducers';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      todos: TodosDataReducer,
    }),
    EffectsModule.forRoot([ToDoEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

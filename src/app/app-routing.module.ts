import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Todo',
    loadChildren: () =>
      import('./to-do/to-do.module').then((m) => m.ToDoModule),
  },
  {
    path: '',
    redirectTo: '/Todo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

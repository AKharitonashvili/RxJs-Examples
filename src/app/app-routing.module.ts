import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Todo',
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
  },
  {
    path: 'User-Posts',
    loadChildren: () =>
      import('./user-posts/user-posts.module').then((m) => m.UserPostsModule),
  },
  {
    path: '',
    redirectTo: '/Todo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

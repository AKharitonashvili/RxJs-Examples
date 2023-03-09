import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPostsComponent } from './user-posts.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserPostsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [UserPostsComponent],
})
export class UserPostsModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { UserAlbumPhotosComponent } from './components/user-album-photos/user-album-photos.component';
import { UserAlbumsComponent } from './components/user-albums/user-albums.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserTodosComponent } from './components/user-todos/user-todos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users/:userId',
    component: UserDetailComponent,
  },
  {
    path: 'users/:userId/posts',
    component: UserPostsComponent,
  },
  {
    path: 'users/:userId/albums',
    component: UserAlbumsComponent,
  },
  {
    path: 'users/:userId/albums/:albumId',
    component: UserAlbumPhotosComponent,
  },
  {
    path: 'users/:userId/todos',
    component: UserTodosComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

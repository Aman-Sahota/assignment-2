import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserAlbumsComponent } from './components/user-albums/user-albums.component';
import { UserTodosComponent } from './components/user-todos/user-todos.component';
import { UserListItemComponent } from './components/user-list/user-list-item/user-list-item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserAlbumPhotosComponent } from './components/user-album-photos/user-album-photos.component';
import { GoBack } from './components/common/go-back/go-back.component';
import { Loader } from './components/common/loader/loader.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserPostsComponent,
    UserAlbumsComponent,
    UserTodosComponent,
    UserListItemComponent,
    NotFoundComponent,
    UserAlbumPhotosComponent,
    GoBack,
    Loader,
    PaginationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

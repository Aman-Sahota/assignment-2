import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  response: User[] = [];
  users: User[] = [];
  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.userService.fetchUserList().subscribe(async (response: User[]) => {
      try {
        this.response = response;
        for (let index = 0; index < response.length; index++) {
          const user = response[index];
          const values: any = await Promise.all([
            this.fetchUserPosts(user.id),
            this.fetchUserAlbums(user.id),
            this.fetchUserTodos(user.id),
          ]);
          this.response[index].userPostCount = values[0];
          this.response[index].userAlbumCount = values[1];
          this.response[index].userTodoFalseCount = values[2].incomplete;
          this.response[index].userTodoTrueCount = values[2].completed;
        }
        this.isLoading = false;
      } catch (error: any) {
        this.isLoading = false;
        alert(`Something went wrong=> ${error.message}`);
      }
    });
  }

  fetchUserPosts(userId: number) {
    return new Promise((resolve, reject) => {
      this.userService.fetchUserPosts(userId.toString()).subscribe(
        (response: any) => {
          resolve(response.length);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  fetchUserAlbums(userId: number) {
    return new Promise((resolve, reject) => {
      this.userService.fetchAlbums(userId.toString()).subscribe(
        (response: any) => {
          resolve(response.length);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  fetchUserTodos(userId: number) {
    return new Promise((resolve, reject) => {
      this.userService.fetchTodos(userId.toString()).subscribe(
        (response: Todo[]) => {
          let completed = 0;
          let incomplete = 0;
          response.map((todo: Todo) => {
            if (todo.completed) {
              completed += 1;
            } else {
              incomplete += 1;
            }
          });
          resolve({ completed, incomplete });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  pagination(data: User[]) {
    this.users = data;
  }
}

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
  users: User[] = [];
  isLoading: boolean = false;

  constructor(private userSerice: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    this.userSerice.fetchUserList().subscribe((response: User[]) => {
      this.users = response;
      for (let index = 0; index < response.length; index++) {
        const user = response[index];
        Promise.allSettled([
          this.fetchUserPosts(user.id),
          this.fetchUserAlbums(user.id),
          this.fetchUserTodos(user.id),
        ]).then((values: any) => {
          this.users[index].userPostCount = values[0].value;
          this.users[index].userAlbumCount = values[1].value;
          this.users[index].userTodoFalseCount = values[2].value.incomplete;
          this.users[index].userTodoTrueCount = values[2].value.completed;
        });
      }
      this.isLoading = false;
    });
  }

  fetchUserPosts(userId: number) {
    return new Promise((resolve, reject) => {
      this.userSerice.fetchUserPosts(userId.toString()).subscribe(
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
      this.userSerice.fetchAlbums(userId.toString()).subscribe(
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
      this.userSerice.fetchTodos(userId.toString()).subscribe(
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
}

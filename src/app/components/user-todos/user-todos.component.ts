import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-todos',
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.scss'],
})
export class UserTodosComponent implements OnInit {
  userTodos: Todo[] = [];
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchUserTodos();
  }

  fetchUserTodos() {
    this.isLoading = true;
    this.userService
      .fetchTodos(this.activatedRoute.snapshot.params['userId'])
      .subscribe((response: Todo[]) => {
        this.userTodos = response;
        this.isLoading = false;
      });
  }

  getCount(type: string) {
    let completed = 0;
    let incomplete = 0;
    this.userTodos.forEach((todo: Todo) => {
      if (todo.completed) {
        completed += 1;
      } else {
        incomplete += 1;
      }
    });
    if (type === 'completed') {
      return completed;
    } else {
      return incomplete;
    }
  }
}

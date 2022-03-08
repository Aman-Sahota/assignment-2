import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-todos',
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.scss'],
})
export class UserTodosComponent implements OnInit {
  userTodos: any;
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
      .subscribe((response) => {
        this.userTodos = response;
        this.isLoading = false;
      });
  }
}

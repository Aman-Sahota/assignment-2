import { Component, OnInit } from '@angular/core';
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
      this.isLoading = false;
    });
  }
}

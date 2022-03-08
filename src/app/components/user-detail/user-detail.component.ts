import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userDetail: any;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchUserDetail();
  }

  fetchUserDetail() {
    this.isLoading = true;
    this.userService
      .fetchSelectedUser(this.activatedRoute.snapshot.params['userId'])
      .subscribe((response) => {
        this.userDetail = response;
        this.isLoading = false;
      });
  }
}
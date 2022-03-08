import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {
  @Input() user: any;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  onCardClick(userId: number) {
    this.router.navigate([`users/${userId}`]);
  }
}

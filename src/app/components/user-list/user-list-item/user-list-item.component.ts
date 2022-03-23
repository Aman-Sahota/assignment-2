import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'app-user-list-item',
    templateUrl: './user-list-item.component.html',
    styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent {
    @Input() user!: User;
    constructor(private router: Router) {}

    goToUserDetail(userId: number) {
        this.router.navigate([`/users/${userId}`]);
    }

    goToUserPosts(userId: number) {
        this.router.navigate([`/users/${userId}/posts`]);
    }

    goToUserAlbums(userId: number) {
        this.router.navigate([`/users/${userId}/albums`]);
    }

    goToUserTodos(userId: number) {
        this.router.navigate([`/users/${userId}/todos`]);
    }
}

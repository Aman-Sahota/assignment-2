import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    response: User[] = [];
    users: User[] = [];

    constructor(
        private dataService: DataService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.fetchUsers();
    }

    fetchUsers() {
        this.dataService.fetchUsers().subscribe((response: User[]) => {
            console.log("userList",response)
            if(response.length === 0){
                return 
            }

                for (let index = 0; index < response.length; index++) {
                    const user = response[index];
                    const postCount = this.dataService.fetchUserPostCount(user.id)
                    const albumCount = this.dataService.fetchUserAlbumCount(user.id)
                    const todoCount = this.dataService.fetchUserTodoCount(user.id)
                    this.response[index].userPostCount = postCount.length;
                    this.response[index].userAlbumCount = albumCount.length;
                    this.response[index].userTodoFalseCount =
                        todoCount.incomplete;
                    this.response[index].userTodoTrueCount =
                        todoCount.completed;
                }
        });
    }

    pagination(data: User[]) {
        this.users = data;
        this.cdr.detectChanges();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    userDetail: User|null = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.fetchUserDetail();
    }

    fetchUserDetail() {
        this.dataService
            .fetchSelectedUser(this.activatedRoute.snapshot.params['userId'])
            .subscribe((response: User|null) => {
                if(!response){
                    return
                }

                const postCount = this.dataService.fetchUserPostCount(response.id)
                    const albumCount = this.dataService.fetchUserAlbumCount(response.id)
                    const todoCount = this.dataService.fetchUserTodoCount(response.id)
                    

                this.userDetail = {
                    ...response,
                    userPostCount: postCount.length,
                    userAlbumCount: albumCount.length,
                    userTodoFalseCount: todoCount.incomplete,
                    userTodoTrueCount: todoCount.completed
                };
            });
    }

}

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take, tap } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Post } from 'src/app/models/post.model';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
    userResponse: User[] = [];
    userSub = new Subscription();

    postResponse: Post[] = [];
    postSub = new Subscription();

    albumResponse: Album[] = [];
    albumSub = new Subscription();

    todoResponse: Todo[] = [];
    todoSub = new Subscription();

    users: User[] = [];

    constructor(
        private dataService: DataService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.fetchUsers();
        this.fetchPosts();
        this.fetchAlbums();
        this.fetchTodos();
    }

    fetchUsers() {
        this.userSub = this.dataService.userList.subscribe((data) => {
            let modifiedUserArr: User[] = [];
            for (let index = 0; index < data.length; index++) {
                const user = data[index];
                const postCount = this.getUserPostCount(user.id);
                const albumCount = this.getUserAlbumCount(user.id);
                const todoCount = this.getUserTodoCount(user.id);
                modifiedUserArr.push({
                    ...user,
                    userPostCount: postCount,
                    userAlbumCount: albumCount,
                    userTodoTrueCount: todoCount.completed,
                    userTodoFalseCount: todoCount.incomplete
                });
            }
            this.userResponse = modifiedUserArr;
        });
    }

    getUserPostCount(userId: number) {
        let postCount = 0;
        for (let index = 0; index < this.postResponse.length; index++) {
            const post = this.postResponse[index];
            if (post.userId === userId) {
                postCount++;
            }
        }
        return postCount;
    }

    getUserAlbumCount(userId: number) {
        let albumCount = 0;
        for (let index = 0; index < this.albumResponse.length; index++) {
            const album = this.albumResponse[index];
            if (album.userId === userId) {
                albumCount++;
            }
        }
        return albumCount;
    }

    getUserTodoCount(userId: number) {
        let todoCount = {
            completed: 0,
            incomplete: 0
        };
        for (let index = 0; index < this.todoResponse.length; index++) {
            const todo = this.todoResponse[index];
            if (todo.userId === userId) {
                if (todo.completed) {
                    todoCount.completed++;
                } else {
                    todoCount.incomplete++;
                }
            }
        }
        return todoCount;
    }

    fetchPosts() {
        this.postSub = this.dataService.postsList.subscribe((data) => {
            this.postResponse = data;
        });
    }

    fetchAlbums() {
        this.albumSub = this.dataService.albumsList.subscribe((data) => {
            this.albumResponse = data;
        });
    }

    fetchTodos() {
        this.todoSub = this.dataService.todosList.subscribe((data) => {
            this.todoResponse = data;
        });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.postSub.unsubscribe();
        this.albumSub.unsubscribe();
        this.todoSub.unsubscribe();
    }

    pagination(data: User[]) {
        this.users = data;
        this.cdr.detectChanges();
    }
}

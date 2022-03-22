import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Post } from 'src/app/models/post.model';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
    userResponse: User[] = [];
    userSub = new Subscription();

    postResponse: Post[] = [];
    postSub = new Subscription();

    albumResponse: Album[] = [];
    albumSub = new Subscription();

    todoResponse: Todo[] = [];
    todoSub = new Subscription();

    userDetail: User | null = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.fetchUserDetail();
        this.fetchPosts();
        this.fetchAlbums();
        this.fetchTodos();
    }

    fetchUserDetail() {
        const userId = Number(this.activatedRoute.snapshot.params['userId']);
        console.log('userId', userId);

        this.userSub = this.dataService.userList.subscribe((data) => {
            for (let index = 0; index < data.length; index++) {
                const user = data[index];
                if (user.id === userId) {
                    const postCount = this.getUserPostCount(user.id);
                    const albumCount = this.getUserAlbumCount(user.id);
                    const todoCount = this.getUserTodoCount(user.id);
                    this.userDetail = {
                        ...user,
                        userPostCount: postCount,
                        userAlbumCount: albumCount,
                        userTodoTrueCount: todoCount.completed,
                        userTodoFalseCount: todoCount.incomplete
                    };
                    break;
                }
            }
        });
    }

    getUserPostCount(userId: number) {
        console.log('yeh galti hai', this.postResponse);
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
        this.postSub = this.dataService.albumsList.subscribe((data) => {
            this.albumResponse = data;
        });
    }

    fetchTodos() {
        this.postSub = this.dataService.todosList.subscribe((data) => {
            this.todoResponse = data;
        });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.postSub.unsubscribe();
        this.albumSub.unsubscribe();
        this.todoSub.unsubscribe();
    }
}

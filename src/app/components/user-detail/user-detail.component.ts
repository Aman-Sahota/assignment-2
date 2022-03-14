import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    userDetail!: User;
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
            .subscribe(async (response: User) => {
                const values: any = await Promise.all([
                    this.fetchUserPosts(response.id),
                    this.fetchUserAlbums(response.id),
                    this.fetchUserTodos(response.id)
                ]);

                this.userDetail = {
                    ...response,
                    userPostCount: values[0],
                    userAlbumCount: values[1],
                    userTodoFalseCount: values[2].incomplete,
                    userTodoTrueCount: values[2].completed
                };

                this.isLoading = false;
            });
    }

    fetchUserPosts(userId: number) {
        return new Promise((resolve, reject) => {
            this.userService.fetchUserPosts(userId.toString()).subscribe(
                (response: any) => {
                    resolve(response.length);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    fetchUserAlbums(userId: number) {
        return new Promise((resolve, reject) => {
            this.userService.fetchAlbums(userId.toString()).subscribe(
                (response: any) => {
                    resolve(response.length);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    fetchUserTodos(userId: number) {
        return new Promise((resolve, reject) => {
            this.userService.fetchTodos(userId.toString()).subscribe(
                (response: Todo[]) => {
                    let completed = 0;
                    let incomplete = 0;
                    response.map((todo: Todo) => {
                        if (todo.completed) {
                            completed += 1;
                        } else {
                            incomplete += 1;
                        }
                    });
                    resolve({ completed, incomplete });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}

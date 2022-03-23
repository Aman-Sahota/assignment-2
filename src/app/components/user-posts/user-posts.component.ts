import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';

import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
    response: Post[] = [];
    userPosts: Post[] = [];
    userList: User[] = [];
    userId: string;

    constructor(
        private dataService: DataService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this.userId = this.activatedRoute.snapshot.params['userId'];
    }

    ngOnInit(): void {
        this.fetchUserList();
        this.fetchUserPosts();
    }

    fetchUserList() {
        this.dataService.fetchUsers().subscribe((response: User[]) => {
            this.userList = response;
        });
    }

    getUser(id: string) {
        return this.userList.find((user) => user.id === Number(id));
    }

    fetchUserPosts() {
        this.dataService
            .fetchUserPosts(this.activatedRoute.snapshot.params['userId'])
            .subscribe((response: Post[]) => {
                try {
                    const postArray: Post[] = [];

                    for (let index = 0; index < response.length; index++) {
                        const post = response[index];
                        const comments = this.dataService.fetchPostComments(post.id)
                        comments.forEach(comment=>{
                            comment.user = {
                                ...this.userList[Math.floor(Math.random() * 10)]
                            };
                        })
                        postArray.push({
                            ...post,
                            comments,
                            showComments: false
                        });
                    }

                    this.response = postArray;

                } catch (error: any) {
                    alert(`Something went wrong => ${error.message}`);
                }
            });
    }

    toggleComments(postId: number) {
        let index = this.userPosts.findIndex((ele: any) => ele.id === postId);
        this.userPosts[index].showComments =
            !this.userPosts[index].showComments;
    }

    goToUser(id: any) {
        this.router.navigate(['/users', id]);
    }

    pagination(data: Post[]) {
        this.userPosts = data;
        this.cdr.detectChanges();
    }
}

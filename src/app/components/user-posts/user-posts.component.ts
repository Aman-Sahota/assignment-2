import {
    ChangeDetectorRef,
    Component,
    OnChanges,
    OnInit,
    SimpleChanges
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
    isLoading: boolean = false;
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
        // this.fetchUserList();
        // this.fetchUserPosts();
    }

    // fetchUserList() {
    //     this.userService.fetchUserList().subscribe((response: User[]) => {
    //         this.userList = response;
    //     });
    // }

    getUser(id: string) {
        return this.userList.find((user) => user.id === Number(id));
    }

    // fetchUserPosts() {
    //     this.isLoading = true;
    //     this.userService
    //         .fetchUserPosts(this.activatedRoute.snapshot.params['userId'])
    //         .subscribe(async (response: Post[]) => {
    //             try {
    //                 const postArray: Post[] = [];
    //                 const promiseArray: any[] = [];

    //                 for (let index = 0; index < response.length; index++) {
    //                     const post = response[index];
    //                     promiseArray.push(this.fetchPostComments(post.id));
    //                     postArray.push({
    //                         ...post,
    //                         comments: [],
    //                         showComments: false
    //                     });
    //                 }

    //                 const values: Comment[][] = await Promise.all(promiseArray);

    //                 values.forEach((value: any) => {
    //                     value.forEach((comment: any) => {
    //                         let postIndex: number = postArray.findIndex(
    //                             (post) => post.id === comment.postId
    //                         );
    //                         postArray[postIndex].comments?.push(comment);
    //                     });
    //                 });

    //                 this.response = postArray;

    //                 this.isLoading = false;
    //             } catch (error: any) {
    //                 alert(`Something went wrong => ${error.message}`);
    //             }
    //         });
    // }

    // fetchPostComments(postId: any) {
    //     return new Promise((resolve, reject) => {
    //         this.userService
    //             .fetchComments(postId)
    //             .subscribe((response: any) => {
    //                 response.forEach((comment: Comment) => {
    //                     comment.user = {
    //                         ...this.userList[Math.floor(Math.random() * 10)]
    //                     };
    //                 });
    //                 resolve(response);
    //             });
    //     });
    // }

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

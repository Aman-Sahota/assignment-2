import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  userDetail: any;
  userPosts: any;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchUserDetail();
    this.fetchUserPosts();
  }

  fetchUserDetail() {
    this.userService
      .fetchSelectedUser(this.activatedRoute.snapshot.params['userId'])
      .subscribe((response) => {
        this.userDetail = response;
      });
  }

  fetchUserPosts() {
    this.isLoading = true;
    this.userService
      .fetchUserPosts(this.activatedRoute.snapshot.params['userId'])
      .subscribe(async (response: any) => {
        const postArray = [];
        for (let index = 0; index < response.length; index++) {
          const post = response[index];
          const comments = await this.fetchPostComments(post.id);
          postArray.push({ ...post, comments, showComments: false });
        }
        this.userPosts = postArray;
        this.isLoading = false;
        console.log(this.userPosts);
      });
  }

  fetchPostComments(postId: any) {
    return this.userService.fetchComments(postId).toPromise();
  }

  toggleComments(postId: number) {
    let index = this.userPosts.findIndex((ele: any) => ele.id === postId);
    this.userPosts[index].showComments = !this.userPosts[index].showComments;
  }
}

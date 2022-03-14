import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map, Observable, of, tap } from 'rxjs';
import { Todo } from '../models/todo.model';
import { Photo } from '../models/photo.model';
import { Album } from '../models/album.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    images = [
        'https://miro.medium.com/max/700/0*Ggt-XwliwAO6QURi.jpg',
        'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202102/google_pay__7__1200x768.jpeg?WJeXdcrm_vaY0K7AWpMp5bXZ65NH_4dg&size=770:433',
        'https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg',
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        'https://qph.fs.quoracdn.net/main-qimg-54166a525ee4fb3097d260173688c157.webp',
        'https://w0.peakpx.com/wallpaper/536/223/HD-wallpaper-anime-sad-boy.jpg',
        'https://w0.peakpx.com/wallpaper/560/1001/HD-wallpaper-anime-boy-anime-anime-boy-anime-boys-demon-depressed-lonely-sad-sad-anime-boy-sad-anime-boys.jpg',
        'https://w0.peakpx.com/wallpaper/151/537/HD-wallpaper-sad-anime-boy-aesthetic-rain-depressed-anime-boys-window-lonely.jpg',
        'https://w0.peakpx.com/wallpaper/144/154/HD-wallpaper-lonely-anime-boy-anime-anime-boy-anime-boys-depressed-lonely-rain-sad-sad-anime-sad-anime-boy-sad-anime-boys.jpg'
    ];
    userList: User[] = [];
    selectedUser!: User;
    userPosts: Post[] = [];
    userComments: Comment[] = [];
    userAlbums: Album[] = [];
    userPhotos: Photo[] = [];
    userTodos: Todo[] = [];

    constructor(private http: HttpClient) {}

    fetchUserList(): Observable<User[]> {
        if (this.userList.length > 0) {
            return of(this.userList);
        }

        return this.http
            .get<User[]>('https://jsonplaceholder.typicode.com/users')
            .pipe(
                map((data: User[]) => {
                    let usersArray: any = [];
                    data.forEach((ele, index) => {
                        usersArray.push({ ...ele, image: this.images[index] });
                    });
                    return usersArray;
                })
            )
            .pipe(
                tap((returnedData: User[]) => {
                    this.userList = returnedData;
                })
            );
    }

    fetchSelectedUser(userId: string): Observable<User> {
        if (this.selectedUser && this.selectedUser.id === Number(userId)) {
            return of(this.selectedUser);
        }

        return this.http
            .get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .pipe(
                map((data: User) => {
                    return {
                        ...data,
                        image: this.images[Number(userId) - 1]
                    };
                })
            )
            .pipe(
                tap((returnedData: User) => {
                    this.selectedUser = returnedData;
                })
            );
    }

    fetchUserPosts(userId: string): Observable<Post[]> {
        if (
            this.userPosts.length > 0 &&
            this.userPosts[0].userId === Number(userId)
        ) {
            return of(this.userPosts);
        }
        return this.http
            .get<Post[]>(
                `https://jsonplaceholder.typicode.com/users/${userId}/posts`
            )
            .pipe(
                tap((returnedData: Post[]) => {
                    this.userPosts = returnedData;
                })
            );
    }

    fetchComments(id: number): Observable<Comment[]> {
        if (
            this.userComments.length > 0 &&
            this.userComments[0].postId === id
        ) {
            return of(this.userComments);
        }
        return this.http
            .get<Comment[]>(
                `https://jsonplaceholder.typicode.com/posts/${id}/comments`
            )
            .pipe(
                tap((returnedData: Comment[]) => {
                    this.userComments = returnedData;
                })
            );
    }

    fetchTodos(userId: string): Observable<Todo[]> {
        if (
            this.userTodos.length > 0 &&
            this.userTodos[0].userId === Number(userId)
        ) {
            return of(this.userTodos);
        }
        return this.http
            .get<Todo[]>(
                `https://jsonplaceholder.typicode.com/users/${userId}/todos`
            )
            .pipe(
                tap((returnedData: Todo[]) => {
                    this.userTodos = returnedData;
                })
            );
    }

    fetchAlbums(userId: string): Observable<Album[]> {
        if (
            this.userAlbums.length > 0 &&
            this.userAlbums[0].userId === Number(userId)
        ) {
            return of(this.userAlbums);
        }
        return this.http
            .get<Album[]>(
                `https://jsonplaceholder.typicode.com/users/${userId}/albums`
            )
            .pipe(
                tap((returnedData: Album[]) => {
                    this.userAlbums = returnedData;
                })
            );
    }

    fetchAlbumPhotos(albumId: string): Observable<Photo[]> {
        if (
            this.userPhotos.length > 0 &&
            this.userPhotos[0].albumId === Number(albumId)
        ) {
            return of(this.userPhotos);
        }
        return this.http
            .get<Photo[]>(
                `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
            )
            .pipe(
                tap((returnedData: Photo[]) => {
                    this.userPhotos = returnedData;
                })
            );
    }
}

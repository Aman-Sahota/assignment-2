import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import {
    BehaviorSubject,
    catchError,
    map,
    Observable,
    of,
    Subject,
    take,
    tap,
    throwError
} from 'rxjs';
import { Todo } from '../models/todo.model';
import { Photo } from '../models/photo.model';
import { Album } from '../models/album.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
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
    userList = new BehaviorSubject<User[]>([]);
    postsList = new BehaviorSubject<Post[]>([]);
    commentsList = new BehaviorSubject<Comment[]>([]);
    albumsList = new BehaviorSubject<Album[]>([]);
    photosList = new BehaviorSubject<Photo[]>([]);
    todosList = new BehaviorSubject<Todo[]>([]);

    constructor(private http: HttpClient) {}

    private handleError(errorRes: HttpErrorResponse) {
        console.log(
            'error check',
            errorRes.status,
            errorRes.statusText,
            errorRes.message
        );
        return throwError('Something went wrong');
    }

    fetchUsers(): Observable<User[]> {
        return this.http
            .get<User[]>('https://jsonplaceholder.typicode.com/users')
            .pipe(
                catchError(this.handleError),
                map((data: User[]) => {
                    let usersArray: any = [];
                    data.forEach((ele, index) => {
                        usersArray.push({ ...ele, image: this.images[index] });
                    });
                    return usersArray;
                }),
                tap((returnedData: User[]) => {
                    this.userList.next(returnedData);
                })
            );
    }

    fetchPosts(): Observable<Post[]> {
        return this.http
            .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
            .pipe(
                catchError(this.handleError),
                tap((returnedData: Post[]) => {
                    this.postsList.next(returnedData);
                })
            );
    }

    fetchComments(): Observable<Comment[]> {
        return this.http
            .get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
            .pipe(
                catchError(this.handleError),
                tap((returnedData: Comment[]) => {
                    this.commentsList.next(returnedData);
                })
            );
    }

    fetchTodos(): Observable<Todo[]> {
        return this.http
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
            .pipe(
                tap((returnedData: Todo[]) => {
                    this.todosList.next(returnedData);
                })
            );
    }

    fetchAlbums(): Observable<Album[]> {
        return this.http
            .get<Album[]>('https://jsonplaceholder.typicode.com/albums')
            .pipe(
                tap((returnedData: Album[]) => {
                    this.albumsList.next(returnedData);
                })
            );
    }

    fetchPhotos(): Observable<Photo[]> {
        return this.http
            .get<Photo[]>(`https://jsonplaceholder.typicode.com/photos`)
            .pipe(
                tap((returnedData: Photo[]) => {
                    this.photosList.next(returnedData);
                })
            );
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
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
    userList: User[] = [];
    postList:Post[] = [];
    commentList:Comment[] = [];
    albumList:Album[] = [];
    photoList:Photo[] = []; 
    todoList:Todo[] = []; 

    constructor(private http: HttpClient) {}

    fetchUserList(): Observable<User[]> {
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
                    this.userList = returnedData;
                })
            )
    }

    fetchPostList(): Observable<Post[]> {
        return this.http
            .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
            .pipe(
                catchError(this.handleError),
                tap((returnedData: Post[]) => {
                    this.postList = returnedData;
                })
            )
    }

    fetchCommentsList(): Observable<Comment[]> {
        return this.http
            .get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
            .pipe(
                catchError(this.handleError),
                tap((returnedData: Comment[]) => {
                    this.commentList = returnedData;
                })
            )
    }

    fetchAlbumList(): Observable<Album[]> {
        return this.http
            .get<Album[]>('https://jsonplaceholder.typicode.com/albums')
            .pipe(
                catchError(this.handleError),
                tap((returnedData: Album[]) => {
                    this.albumList = returnedData;
                })
            )
    }

    fetchPhotoList(): Observable<Photo[]> {
        return this.http
            .get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
            .pipe(
                catchError(this.handleError),
                tap((returnedData: Photo[]) => {
                    this.photoList = returnedData;
                })
            )
    }

    fetchTodoList(): Observable<Todo[]> {
        return this.http
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
            .pipe(
                catchError(this.handleError),
                tap((returnedData: Todo[]) => {
                    this.todoList = returnedData;
                })
            )
    }

    private handleError(error:HttpErrorResponse){
        console.log("Http Error",error)
        return throwError("Something went wrong "+ error.message)
    }

    fetchUsers(){
        return of(this.userList)
    }

    fetchUserPostCount(userId:number){
        let posts = [];
        for (let index = 0; index < this.postList.length; index++) {
            const post = this.postList[index];
            if(post.userId === userId){
                posts.push(post)
            }
        }
        return posts
    }

    fetchUserAlbumCount(userId:number){
        let albums = [];
        for (let index = 0; index < this.albumList.length; index++) {
            const album = this.albumList[index];
            if(album.userId === userId){
                albums.push(album)
            }
        }
        return albums
    }

    fetchUserTodoCount(userId:number){
         let   completed=0
         let   incomplete=0
        for (let index = 0; index < this.todoList.length; index++) {
            const todo = this.todoList[index];
            if(todo.userId === userId){
                if(todo.completed){
                    completed++
                }else{
                    incomplete++
                }
            }
        }
        return {
            completed,
            incomplete
        }
    }

    fetchSelectedUser(userId:string):Observable<User|null>{
        const selectedUser = this.userList.find(user=>user.id === Number(userId))
        return of(selectedUser ? selectedUser : null)
    }
    
    fetchUserAlbums(userId:string):Observable<Album[]>{
        return of(this.albumList.filter(album=>album.userId === Number(userId)))
    }

    fetchAlbumPhotos(albumId:string):Observable<Photo[]>{
        return of(this.photoList.filter(photo=>photo.albumId === Number(albumId)))
    }

    fetchUserPosts(userId:string):Observable<Post[]>{
        return of(this.postList.filter(post=>post.userId === Number(userId)))
    }
    
    fetchPostComments(postId:number){
        return this.commentList.filter(comment=>comment.postId === postId)
    }

    fetchUserTodos(userId:string):Observable<Todo[]>{
        return of(this.todoList.filter(todo=>todo.userId === Number(userId)))
    }
}

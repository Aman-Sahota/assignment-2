import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { concatMap, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
    'https://w0.peakpx.com/wallpaper/144/154/HD-wallpaper-lonely-anime-boy-anime-anime-boy-anime-boys-depressed-lonely-rain-sad-sad-anime-sad-anime-boy-sad-anime-boys.jpg',
  ];
  constructor(private http: HttpClient) {}

  fetchUserList() {
    return this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((data) => {
          let usersArray: any = [];
          data.forEach((ele, index) => {
            usersArray.push({ ...ele, image: this.images[index] });
          });
          return usersArray;
        })
      );
  }

  fetchSelectedUser(userId: string) {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .pipe(
        map((data) => {
          return { ...data, image: this.images[Number(userId) - 1] };
        })
      );
  }

  fetchUserPosts(userId: string) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
  }

  fetchComments(id: number) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
  }

  fetchTodos(userId: string) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
  }

  fetchAlbums(userId: string) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`
    );
  }

  fetchAlbumPhotos(albumId: string) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );
  }
}

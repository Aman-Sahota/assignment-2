import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/models/photo.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-album-photos',
  templateUrl: './user-album-photos.component.html',
  styleUrls: ['./user-album-photos.component.scss'],
})
export class UserAlbumPhotosComponent implements OnInit {
  userPhotos: Photo[] = [];
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchUserPhotos();
  }

  fetchUserPhotos() {
    this.isLoading = true;
    this.userService
      .fetchAlbumPhotos(this.activatedRoute.snapshot.params['albumId'])
      .subscribe((response: Photo[]) => {
        this.userPhotos = response;
        this.isLoading = false;
      });
  }
}

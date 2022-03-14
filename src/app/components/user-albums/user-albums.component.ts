import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-albums',
    templateUrl: './user-albums.component.html',
    styleUrls: ['./user-albums.component.scss']
})
export class UserAlbumsComponent implements OnInit {
    response: Album[] = [];
    userAlbums: Album[] = [];
    isLoading: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.fetchUserAlbums();
    }

    fetchUserAlbums() {
        this.isLoading = true;
        this.userService
            .fetchAlbums(this.activatedRoute.snapshot.params['userId'])
            .subscribe((response: Album[]) => {
                this.isLoading = false;
                this.response = response;
            });
    }

    pagination(data: Album[]) {
        this.userAlbums = data;
    }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-user-albums',
    templateUrl: './user-albums.component.html',
    styleUrls: ['./user-albums.component.scss']
})
export class UserAlbumsComponent implements OnInit {
    response: Album[] = [];
    userAlbums: Album[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.fetchUserAlbums();
    }

    fetchUserAlbums() {
        this.dataService
            .fetchUserAlbums(this.activatedRoute.snapshot.params['userId'])
            .subscribe((response: Album[]) => {
                this.response = response;
            });
    }

    pagination(data: Album[]) {
        this.userAlbums = data;
        this.cdr.detectChanges();
    }
}

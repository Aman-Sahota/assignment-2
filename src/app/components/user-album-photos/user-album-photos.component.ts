import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/models/photo.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-user-album-photos',
    templateUrl: './user-album-photos.component.html',
    styleUrls: ['./user-album-photos.component.scss']
})
export class UserAlbumPhotosComponent implements OnInit {
    response: Photo[] = [];
    userPhotos: Photo[] = [];
    isLoading: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        // this.fetchUserPhotos();
    }

    // fetchUserPhotos() {
    //     this.isLoading = true;
    //     this.userService
    //         .fetchAlbumPhotos(this.activatedRoute.snapshot.params['albumId'])
    //         .subscribe((response: Photo[]) => {
    //             this.response = response;
    //             this.isLoading = false;
    //         });
    // }

    pagination(data: Photo[]) {
        this.userPhotos = data;
        this.cdr.detectChanges();
    }
}

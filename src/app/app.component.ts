import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isLoading: boolean = false;
    constructor(private router: Router, private dataService: DataService) {}

    ngOnInit(): void {
        this.fetchData();
    }

    async fetchData() {
        try {
            this.isLoading = true;
            const response = await Promise.all([
                this.fetchAlbums(),
                this.fetchComments(),
                this.fetchPhotos(),
                this.fetchPosts(),
                this.fetchTodos(),
                this.fetchUsers()
            ]);
            console.log('response', response);
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.log('Error', error);
        }
    }

    fetchAlbums() {
        return new Promise((resolve, reject) => {
            this.dataService.fetchAlbums().subscribe(
                (data) => {
                    resolve(data);
                },
                (errorMessage) => {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        });
    }

    fetchComments() {
        return new Promise((resolve, reject) => {
            this.dataService.fetchComments().subscribe(
                (data) => {
                    resolve(data);
                },
                (errorMessage) => {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        });
    }

    fetchPhotos() {
        return new Promise((resolve, reject) => {
            this.dataService.fetchPhotos().subscribe(
                (data) => {
                    resolve(data);
                },
                (errorMessage) => {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        });
    }

    fetchPosts() {
        return new Promise((resolve, reject) => {
            this.dataService.fetchPosts().subscribe(
                (data) => {
                    resolve(data);
                },
                (errorMessage) => {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        });
    }

    fetchTodos() {
        return new Promise((resolve, reject) => {
            this.dataService.fetchTodos().subscribe(
                (data) => {
                    resolve(data);
                },
                (errorMessage) => {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        });
    }

    fetchUsers() {
        return new Promise((resolve, reject) => {
            this.dataService.fetchUsers().subscribe(
                (data) => {
                    resolve(data);
                },
                (errorMessage) => {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        });
    }

    goToHome() {
        this.router.navigate(['/users']);
    }
}

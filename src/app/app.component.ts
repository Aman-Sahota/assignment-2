import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isLoading:boolean = false
    constructor(private router: Router, private dataService: DataService) {}

    goToHome() {
        this.router.navigate(['/users']);
    }

    ngOnInit(): void {
        this.fetchData();
    }

    async fetchData(){
        try {
            this.isLoading = true
            const response = await Promise.all([this.fetchAlbums(),this.fetchComments(), this.fetchPhotos(), this.fetchPosts(), this.fetchTodos(), this.fetchUsers()]);
            console.log("response",response)
            this.isLoading = false
        } catch (error) {
            console.log("Error",error)
            this.isLoading = false
        }
    }

    fetchUsers() {
        return new Promise((resolve, reject) => {
            this.dataService.fetchUserList().subscribe(
                (response: any) => {
                    resolve(response);
                }
            );
        });
    }
   

    fetchPosts(){
        return new Promise((resolve, reject)=>{
            this.dataService.fetchPostList().subscribe(response=>{
                resolve(response)
            })
        })
    }

    fetchComments(){
        return new Promise((resolve, reject)=>{
            this.dataService.fetchUserList().subscribe(response=>{
                resolve(response)
            })
        })
    }

    fetchAlbums(){
        return new Promise((resolve, reject)=>{
            this.dataService.fetchUserList().subscribe(response=>{
                resolve(response)
            })
        })
    }

    fetchPhotos(){
        return new Promise((resolve, reject)=>{
            this.dataService.fetchUserList().subscribe(response=>{
                resolve(response)
            })
        })
    }

    fetchTodos(){
        return new Promise((resolve, reject)=>{
            this.dataService.fetchUserList().subscribe(response=>{
                resolve(response)
            })
        })
    }
}

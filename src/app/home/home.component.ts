import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.getCurrentUser();
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAllUsers().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    private getCurrentUser() {
        this.userService.getProfile().pipe(first()).subscribe(user => { 
            this.currentUser = user;
        });
    }
}
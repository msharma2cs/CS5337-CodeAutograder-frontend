import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router ,ActivatedRoute, Params} from '@angular/router';
import { User } from '../_models';
import { CourseService, UserService } from '../_services';
import { Course } from '../_models/course';
import { SchoolCourse } from '../_models/schoolClass';

@Component({templateUrl: 'user-class.component.html'})
export class UserClassComponent implements OnInit {
    currentUser: User;
    users:User[] = [];

    constructor(
        private router: Router,
        private courseService: CourseService,
        private userService: UserService,
        private routerIonfo:ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getUsers(this.routerIonfo.snapshot.queryParams["cid"]);
    }

    private getUsers(cid:number) {
        this.userService.getUsers(cid).pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    private getCurrentUser() {
        this.userService.getProfile().pipe(first()).subscribe(user => { 
            this.currentUser = user;
        });
    }

    deleteUser(uid: number) {
        this.userService.deleteUserFromClass(uid, this.routerIonfo.snapshot.queryParams['cid']).pipe(first()).subscribe(() => {
            this.getUsers(this.routerIonfo.snapshot.queryParams["cid"]);
        });
    }
}
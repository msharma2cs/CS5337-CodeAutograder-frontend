import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Assignment } from '../_models';
import { UserService, AssignmentService } from '../_services';
import { Course } from '../_models/course';
import { SchoolCourse } from '../_models/schoolClass';
import { Router ,ActivatedRoute, Params} from '@angular/router';

@Component({templateUrl: 'student-assignments.component.html'})
export class StudentAssigmentsComponent implements OnInit {
    currentUser: User;
    assignments:Assignment[] = [];
    instructors:User[] = [];
    scourses: SchoolCourse[] = [];

    constructor(
        private assignmentService: AssignmentService,
        private userService: UserService,
        private routerIonfo:ActivatedRoute,
    ) {
        this.getCurrentUser();
    }

    ngOnInit() {
        this.getAssignments()
    }

    private getAssignments() {
        this.assignmentService.getAllAssignments(this.routerIonfo.snapshot.queryParams["id"]).pipe(first()).subscribe(assignments => { 
           console.log(assignments)
            this.assignments = assignments;
        });
    }

    private getCurrentUser() {
        this.userService.getProfile().pipe(first()).subscribe(user => { 
            this.currentUser = user; 
        });
    }
}
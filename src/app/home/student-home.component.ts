import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { CourseService, UserService } from '../_services';
import { Course } from '../_models/course';
import { SchoolCourse } from '../_models/schoolClass';

@Component({templateUrl: 'student-home.component.html'})
export class StudentHomeComponent implements OnInit {
    currentUser: User;
    courses:Course[] = [];
    instructors:User[] = [];
    scourses: SchoolCourse[] = [];

    constructor(private courseService: CourseService,private userService: UserService) {
        this.getCurrentUser();
    }

    ngOnInit() {
        this.getAllCourse();
    }

    private getAllCourse() {
        this.courseService.getAllCourses().pipe(first()).subscribe(courses => { 
            console.log('....', courses);
            for (let i = 0; i < courses.length; i++) {
                this.scourses.push(courses[i].school_class);
            }
            this.courses = courses;
        });
    }

    private getCurrentUser() {
        this.userService.getProfile().pipe(first()).subscribe(user => { 
            this.currentUser = user;
        });
    }
}
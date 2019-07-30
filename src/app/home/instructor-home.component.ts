import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { CourseService, UserService } from '../_services';
import { Course } from '../_models/course';
import { SchoolCourse } from '../_models/schoolClass';

@Component({templateUrl: 'instructor-home.component.html'})
export class InstructorHomeComponent implements OnInit {
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
        this.courseService.getAllInstructedCourses().pipe(first()).subscribe(courses => { 
            for (var i=0; i < courses.length; i++) {
                this.scourses.push(courses[i]&&courses[i].school_class);
                this.instructors.push(courses[i]&&courses[i].instructor);
            }
            for (var i=0; i < courses.length; i++) {
                this.scourses.push(courses[i].school_class)
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

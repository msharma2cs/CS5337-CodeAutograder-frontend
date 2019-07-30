import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, StudentHomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import {ProfileComponent} from './profile';
import {TermComponent} from './term';
import { AuthGuard } from './_guards';
import { UserDetailComponent } from './user-detail';
import { AddTermComponent } from './term/add-term.component';
import { EditTermComponent} from './term/edit-term.component';
import { CourseComponent } from './course/course.component';
import { InstructorHomeComponent } from './home/instructor-home.component';
import { AddUserCourseComponent } from './course/add-user-course.component';
import { AssignmentComponent } from './course/assignment.component';
import { StudentAssigmentsComponent, SubmitAssignmentComponent } from './assignments';
import { UserClassComponent} from './user-detail/user-class.component';
import { GradeComponent } from './grade/grade.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
    { path: 'user/cin', component: UserDetailComponent,canActivate: [AuthGuard]},
    { path: 'term', component: TermComponent,canActivate: [AuthGuard]},
    { path: 'addTerm', component: AddTermComponent,canActivate: [AuthGuard]},
    { path: 'term/edit', component: EditTermComponent,canActivate: [AuthGuard]},
    { path: 'course', component: CourseComponent,canActivate: [AuthGuard]},
    { path: 'ihome', component: InstructorHomeComponent,canActivate: [AuthGuard]},
    { path: 'addStudent', component: AddUserCourseComponent,canActivate: [AuthGuard]},
    { path: 'addAssignment', component: AssignmentComponent,canActivate: [AuthGuard]},
    { path: 'shome', component: StudentHomeComponent,canActivate: [AuthGuard]},
    { path: 'assignments', component: StudentAssigmentsComponent,canActivate: [AuthGuard]},
    { path: 'submit/assignment', component: SubmitAssignmentComponent,canActivate: [AuthGuard]},
    { path: 'class/users', component:UserClassComponent,canActivate:[AuthGuard]},
    { path: 'grade', component: GradeComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);

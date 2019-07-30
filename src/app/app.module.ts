import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, TermService, CourseService, AssignmentService } from './_services';
import { LocalTokenService } from './_services/local.token.service';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TermComponent } from './term/term.component';
import { AddTermComponent } from './term/add-term.component';
import { EditTermComponent } from './term';
import { CourseComponent } from './course/course.component';
import { InstructorHomeComponent } from './home/instructor-home.component';
import { AddUserCourseComponent } from './course/add-user-course.component';
import { AssignmentComponent } from './course/assignment.component';
import { StudentHomeComponent } from './home/student-home.component';
import { StudentAssigmentsComponent } from './assignments/student-assignments.component';
import { SubmitAssignmentComponent } from './assignments/submit-assignment.component';
import { UserClassComponent } from './user-detail/user-class.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GradeComponent } from './grade/grade.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        UserDetailComponent,
        TermComponent,
        AddTermComponent,
        EditTermComponent,
        CourseComponent,
        InstructorHomeComponent,
        AddUserCourseComponent,
        AssignmentComponent,
        StudentHomeComponent,
        StudentAssigmentsComponent,
        SubmitAssignmentComponent,
        UserClassComponent,
        NavbarComponent,
        GradeComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        TermService,
        CourseService,
        AssignmentService,
        LocalTokenService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

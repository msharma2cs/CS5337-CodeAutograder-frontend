import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';
import {User} from '../_models/user'

@Component({templateUrl: 'profile.component.html'})
export class ProfileComponent implements OnInit {
    user:User

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getProfile()
    }


    getProfile() {
        this.userService.getProfile().pipe(first()).subscribe(user => { 
            console.log(user)
            this.user = user
        });
    }

  }
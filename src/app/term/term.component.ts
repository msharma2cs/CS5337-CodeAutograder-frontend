import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Term } from '../_models';
import { TermService } from '../_services';
import { LocalTokenService } from '../_services/local.token.service';

@Component({templateUrl: 'term.component.html'})
export class TermComponent implements OnInit {
    terms: Term[] = [];
    isLoggedInAsAdmin = false;

    constructor(
        private termService: TermService,
        private localTokenProvider: LocalTokenService) {
      this.getAllTerms();
    }

    ngOnInit() {
        this.isLoggedInAsAdmin = this.localTokenProvider.getUserType() === 'ADMIN';
        this.getAllTerms();
    }

    deleteUser(id: number) {
        this.termService.delete(id).pipe(first()).subscribe(() => {
          this.getAllTerms();
        });
    }

    private getAllTerms() {
        this.termService.getAllTerms().pipe(first()).subscribe(terms => {
            this.terms = terms;
        });
    }

}

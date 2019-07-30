import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Term } from '../_models';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable()
export class TermService {
    apiUrl = "http://localhost:8080/springrest/api/";
    constructor(private http: HttpClient) { }

    getAllTerms() {
        return this.http.get<Term[]>(this.apiUrl+'terms');
    }

    getById(id: number) {
        return this.http.get<Term>(this.apiUrl+"term/" + id);
    }

    private extractData(res: Response) {
        let body = res;
        return body || { };
    }

    register(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'a'
            })
        };
        console.log(httpOptions.headers.get('Authorization'))
        return this.http.post(this.apiUrl+"user",user,httpOptions).pipe(
            map(this.extractData)
        );
    }

    update(term: Term,id:Number) {
        return this.http.put(this.apiUrl+"term/" + id, term);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl+'term/' + id);
    }

    addTerm(term:Term) {
      return this.http.post(this.apiUrl+'term/',term);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
    apiUrl = "http://localhost:8080/springrest/api/";

    constructor(private http: HttpClient) { }

    getAllUsers() {
        return this.http.get<User[]>(this.apiUrl+'users');
    }

    getUsers(cid:number) {
        return this.http.get<User[]>(this.apiUrl+"specific_class/"+cid+"/users");
    }

    getByCin(cin: number) {
        return this.http.get<User>(this.apiUrl+"user/cin/" + cin);
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

    update(user: User,id:Number) {
        var json
        if (user.enabled==true) {
            json = {
                "name":user.name,
                "type":Number(user.type),
                "enabled":true
            }
        }
        else {
            json = {
                "name":user.name,
                "type":Number(user.type),
                "enabled":false
            }
        }
        return this.http.put(this.apiUrl+"user/" + id, json);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl+'user/' + id);
    }

    getProfile() {
        return this.http.get<User>(this.apiUrl+"user");
    }

    deleteUserFromClass(uid:number,cid:number) {
        return this.http.delete(this.apiUrl+"user/"+uid+"/specific_class/"+cid);
    }
}
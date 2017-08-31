import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUser} from './user';

@Injectable()
export class UserService {
    private baseUrl = 'api/users';

    constructor(private http: Http) { }

    getUsers(): Observable<IUser[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getUsers: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getUser(id: number): Observable<IUser> {
        if (id === 0) {
        return Observable.of(this.initializeUser());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getUser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    saveUser(user: IUser) : Observable<IUser> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (user.id === 0) {
            return this.createUser(user, options);
        }
        
    }

    private createUser(user: IUser, options: RequestOptions): Observable<IUser> {
        user.id = undefined;
        return this.http.post(this.baseUrl, user, options)
            .map(this.extractData)
            .do(data => console.log('createUser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeUser(): IUser {
        // Return an initialized object
        return {
            id: 0,
            userName: null,
            userAge: null,
            userEmail: null
        };
    }
}

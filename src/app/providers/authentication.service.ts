import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../models/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(body:any): Observable<any> {
    
    let url = "http://localhost:8080/api/auth/signin";
    let response:any; 
    let headers    = new HttpHeaders({  
      'Content-Type': 'application/json', 
      // 'X-Requested-Url': url, 
      // 'X-Requested-Method': 'POST', 
      // 'Authorization': Authorization 
    }); 
    let options    = { headers: headers }; 

    return this.http
      .post(url,body,options) 
      .map(this.extractData) 
      .catch(this.handleError); 
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  private extractData(body: any) {
    return Object.assign(body);
  }
  private handleError(error: HttpErrorResponse | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    let errObj: any;

    if (error instanceof HttpErrorResponse) {
      const err = error.message || JSON.stringify(error);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
      errObj = error.message;
    } else {
      errMsg = error.message ? error.message : error.toString();
      const body = error.message || "";
      errObj = body;
    }
    return Observable.throw(error.status);
  }
}

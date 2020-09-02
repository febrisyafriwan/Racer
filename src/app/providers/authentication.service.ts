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
  userAuth = new User();
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

  login(body: any): Observable<any> {
    this.userAuth = new User()
    let url = "http://localhost:8080/employees";
    let response: any;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
      // 'X-Requested-Url': url,
      // 'X-Requested-Method': 'POST',
      // 'Authorization': Authorization
    });
    let options = { headers: headers };

    return this.http.post(url, body, options).pipe(
      map(rs => {
        if (rs && rs.data) {
          console.log(rs)
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.userAuth.name = rs.data.principal.name;
          this.userAuth.email = rs.data.principal.email;
          this.userAuth.username = rs.data.principal.username;
          this.userAuth.token = "Bearer" + " " + rs.accessToken;
          this.userAuth.email = rs.data.principal.email;
          rs.data.authorities.map((val, i) => {
            this.userAuth.role.push(val.authority);
          });
          console.log(this.userAuth);
          localStorage.setItem("currentUser", JSON.stringify(this.userAuth));
          this.currentUserSubject.next(this.userAuth);
        }
      })
    );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
  register(body: any): Observable<any> {
    let url = "http://localhost:8080/api/auth/signup";
    let response: any;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
      // 'X-Requested-Url': url,
      // 'X-Requested-Method': 'POST',
      // 'Authorization': Authorization
    });
    let options = { headers: headers };

    return this.http
      .post(url, body, options)
      .pipe(map(this.extractData))
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

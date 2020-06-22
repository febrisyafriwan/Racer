import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./providers/authentication.service";
import { User } from "./models/user";
import { Role } from "./models/role";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  currentUser: User;
  active = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    
    });
  }
  ngOnInit() {}

  get isAdmin() {
    let hasAdmin;
    if (this.currentUser) {
      this.currentUser.role.map((val, i) => {
        if (val == "ROLE_ADMIN") hasAdmin = true;
      });
    }
    return this.currentUser && hasAdmin;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
  activeTab() {
    this.active = !this.active;
  }
  setMyClasses() {
    let classes = {
      active: this.active
    };
    return classes;
  }
  signout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
  checkUser() {
    console.log(JSON.stringify(this.currentUser));
  }
}

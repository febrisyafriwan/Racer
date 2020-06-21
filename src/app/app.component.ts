import { Component, OnInit, HostListener, ViewChild } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
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
  screenHeight: number;
  screenWidth: number;
  active = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.getScreenSize();
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }
  ngOnInit() {}
  @HostListener("window:resize", ["$event"])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  get isAdmin() {
    let hasAdmin;
    this.currentUser.role.map((val,i)=>{
      if(val == 'admin')hasAdmin = true
    })
    return this.currentUser && hasAdmin;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
  calculation(ev?: any) {
    const val = Math.round(this.screenHeight - ev);
    return val;
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

  //  this.router.navigate(['/login']);
}

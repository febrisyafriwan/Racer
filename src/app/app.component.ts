import { Component, OnInit, HostListener, ViewChild } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { DataService } from "./data.service";
import { Router } from "@angular/router";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  screenHeight: number;
  screenWidth: number;
  active = false;
  constructor(private router: Router) {
    this.getScreenSize();
  }
  ngOnInit() {}
  @HostListener("window:resize", ["$event"])
  getScreenSize(event?:any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, this.screenWidth);
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

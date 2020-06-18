import { Component, OnInit, HostListener } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { DataService } from "./data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  active = false;
  ngOnInit() {}
  activeTab() {
    this.active = !this.active;
    console.log(this.active)
  }
  setMyClasses() {
    let classes = {
      active: this.active
    };
    return classes;
  }
}

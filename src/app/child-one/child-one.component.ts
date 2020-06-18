import { Component, HostListener, ElementRef } from "@angular/core";
import { DataService } from "../data.service";
@Component({
  selector: "my-child-one",
  templateUrl: "./child-one.component.html",
  styleUrls: ["./child-one.component.css"]
})
export class ChildOneComponent {
  isShow: boolean;
  topPosToStartShowing = 100;
  constructor(private ds: DataService) {}
  ngOnInit() {
    // send message to subscribers via observable subject
    this.ds.sendData("false");
  }
  @HostListener("window:scroll")
  checkScroll() {
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    console.log("[scroll]", scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
      this.ds.sendData("true");
    } else {
      this.isShow = false;
      this.ds.sendData("false");
    }
  }
  ngOnDestroy() {
    // clear message
    this.ds.clearData();
  }
  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
}

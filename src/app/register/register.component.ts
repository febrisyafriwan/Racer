import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { FormControl, Validators } from "@angular/forms";
@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  constructor() {}
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  ngOnInit() {}
}

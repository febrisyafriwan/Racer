import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { FormGroup , Validators , FormBuilder,AbstractControl} from '@angular/forms';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
class Registration {
  username = "";
  password = "";
}
@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  loginform:FormControl
  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.loginform = this.fb.group({
      name: ["", [Validators.required, cvalidate]],
      password: ["", [Validators.required, cvMinlength(5)]]
    });
  }
}

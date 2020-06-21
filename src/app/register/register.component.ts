import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { RegisterService } from "../providers/register.service";
import { User } from "../models/user";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormControl
} from "@angular/forms";

class UserForm {
  "name": "";
  "username": "";
  "email": "";
  "role": [];
  "password": "";
}
@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  userForm = new UserForm();
  registerForm: any;
  role = {
    user: false,
    admin: false,
    pm: false
  };

  constructor(
    private fb: FormBuilder,
    private registerProvider: RegisterService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    });
  }
  send() {
    for (let prop in this.role) {
      if (this.role.prop) {
        this.userForm.role.push(this.role.prop);
      }
    }
    console.log(this.userForm);
    if (this.registerForm.valid) {
      console.log("submitted", this.registerForm.value);
    } else {
      console.log("error", this.registerForm.controls);
    }
  }
  registration() {
    console.log("i");
    this.registerProvider.register().subscribe(
      rs => {
        console.log(rs);
      },
      error => {}
    );
    //untuk lazy load backend harus menyediakan limit offset dan total element
    /* */
  }
}

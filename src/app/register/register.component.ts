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
  name: string;
  username: string;
  email: string;
  role = [];
  password: string;
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
      name: ["", [Validators.required,Validators.minLength(3)]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    });
  }
  resetValue() {
    this.userForm = new UserForm();
  }
  setValue() {
    this.resetValue();
    this.userForm.name = this.registerForm.value.name;
    this.userForm.username = this.registerForm.value.username;
    this.userForm.password = this.registerForm.value.password;
    this.userForm.email = this.registerForm.value.email;
    //set role
    for (let prop in this.role) {
      console.log(this.role[prop]);
      if (this.role[prop]) {
        this.userForm.role.push(prop);
      }
    }
  }
  send() {
    this.setValue();
    console.log(JSON.stringify(this.userForm));
    if (this.registerForm.valid) {
      // this.registerProvider.register(JSON.stringify(this.userForm)).subscribe(
      //   rs => {
      //     console.log(rs);
      //   },
      //   error => {console.log(error)}
      // );
    } else {
      console.log("error", this.registerForm.controls);
    }
  }
}

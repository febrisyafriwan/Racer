import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { RegisterService } from "../providers/register.service";
import { User } from "../models/user";
import {MatDialog} from '@angular/material/dialog';
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
    private registerProvider: RegisterService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      username: ["", [Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      password: ["", [Validators.required,Validators.minLength(7),Validators.maxLength(50)]],
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
      if (this.role[prop]) {
        this.userForm.role.push(prop);
      }
    }
  }
  send() {
    this.setValue();
    console.log(JSON.stringify(this.userForm));
    if (this.registerForm.valid) {
      this.registerProvider.register(JSON.stringify(this.userForm)).subscribe(
        rs => {
          console.log(rs);
        },
        error => {console.log(error)
        this.openDialog()}
      );
    } else {
      console.log("error", this.registerForm.controls);
    }
  }
  
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}

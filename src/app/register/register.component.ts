import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../providers/authentication.service";
import { User } from "../models/user";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../helpers/dialog/dialog.component";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
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
    private authProvider: AuthenticationService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.buildRegisterForm();
  }
  resetValue() {
    this.userForm = new UserForm();
  }
  buildRegisterForm() {
    this.registerForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      username: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      password: [
        "",
        [Validators.required, Validators.minLength(7), Validators.maxLength(50)]
      ],
      email: ["", [Validators.required, Validators.email]]
    });
    this.role = {
      user: false,
      admin: false,
      pm: false
    };
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
      this.authProvider.register(JSON.stringify(this.userForm)).subscribe(
        rs => {
          console.log(rs);
          console.log("berhasil");
          this.openDialogSuccess();
          this.buildRegisterForm();
        },
        error => {
          console.log(error);
          console.log("error");
          if (error.status == 400) {
            this.openDialogFail();
          } else if (error.status == 200) {
            this.openDialogSuccess();
            this.login()
          }
          this.buildRegisterForm();
        }
      );
    }
  }
  openDialogFail() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: "Username or Email is already taken",
        buttonText: {
          cancel: "Ok"
        }
      }
    });
  }
  openDialogSuccess() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: "Register Success",
        buttonText: {
          cancel: "Ok"
        }
      }
    });
  }
  login(){
    this.router.navigate(["/login"]);
  }
}

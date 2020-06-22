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
class UserForm {
  username: string;
  password: string;
}
@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  userAuth = new User();
  userForm = new UserForm();
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private authProvider: AuthenticationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
  resetValue() {
    this.userForm = new UserForm();
  }
  buildRegisterForm() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
  setValue() {
    this.resetValue();
    this.userForm.username = this.loginForm.value.username;
    this.userForm.password = this.loginForm.value.password;
  }
  send() {
    this.setValue();
    console.log(JSON.stringify(this.userForm));
    if (this.loginForm.valid) {
      this.authProvider.login(JSON.stringify(this.userForm)).subscribe(
        rs => {
          console.log(rs);
          console.log("berhasil");
          this.openDialogSuccess();
          this.buildRegisterForm();
          if (rs && rs.data) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            this.userAuth.name = rs.data.principal.name;
            this.userAuth.email = rs.data.principal.email;
            this.userAuth.username = rs.data.principal.username;
            this.userAuth.token = "Bearer"+" "+ rs.accessToken;
            this.userAuth.email = rs.data.principal.email;
            rs.data.authorities.map((val,i => {
              this.userAuth.role.push(val.authorities)
            }))
            console.log( this.userAuth)
            // localStorage.setItem("currentUser", JSON.stringify(this.userAuth));
            // this.currentUserSubject.next(this.userAuth);
          }
        },
        error => {
          console.log(error);
          console.log("error");
          if (error == 400) {
            this.openDialogFail();
          } else if (error == 200) {
            this.openDialogSuccess();
          } else if (error == 401) {
            this.openDialogFail();
            this.buildRegisterForm();
          }
        }
      );
    }
  }
  openDialogFail() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: "Username or Password is wrong",
        buttonText: {
          cancel: "Ok"
        }
      }
    });
  }
  openDialogSuccess() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: "Login Success",
        buttonText: {
          cancel: "Ok"
        }
      }
    });
  }
}

import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../providers/authentication.service";
import {User} from "../models/user";
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
  userForm  = new UserForm()
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private authProvider: AuthenticationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }
    resetValue() {
    this.userForm = new UserForm();
  }
  buildRegisterForm() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
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
        },
        error => {
          console.log(error);
          console.log("error");
          if (error == 400) {
            this.openDialogFail();
          } else if (error == 200) {
            this.openDialogSuccess();
          }else if (error == 401) {
            this.openDialogFail();
          this.buildRegisterForm();
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

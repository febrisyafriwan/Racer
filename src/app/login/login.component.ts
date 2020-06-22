import { Component } from "@angular/core";
import { AuthenticationService } from "../providers/authentication.service";
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
import { map} from 'rxjs/operators';
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
  userForm = new UserForm();
  loginForm: any;
  returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private authProvider: AuthenticationService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }
  ngOnInit() {
    this.buildRegisterForm();
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    console.log(this.returnUrl);
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

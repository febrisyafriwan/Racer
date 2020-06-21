import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { RegisterProvider } from "../provider/register";
import {User} from "../model/user";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormControl
} from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  userForm  = new User()
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private RegisterProvider: RegisterProvider
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }
  send() {
    if (this.loginForm.valid) {
      console.log("submitted", this.loginForm.value);
    } else {
      console.log("error", this.loginForm.controls);
    }
  }
  getData() {
    console.log('i')
    this.RegisterProvider.getData().subscribe(
      rs => {
        console.log(rs);
      },
      error => {}
    );
    //untuk lazy load backend harus menyediakan limit offset dan total element
    /* */
  }
}

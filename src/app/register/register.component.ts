import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { RegisterProvider } from "../provider/register";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormControl
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
  loginform: any;
  constructor(
    private fb: FormBuilder,
    private RegisterProvider: RegisterProvider
  ) {}

  ngOnInit() {
    this.loginform = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    });
   
  }
  send() {
    if (this.loginform.valid) {
      console.log("submitted", this.loginform.value);
    } else {
      console.log("error", this.loginform.controls);
    }
  }
  getData() {
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

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

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {

  registerForm: any;
  user:false;
  admin:false;
  pm:false;
  constructor(
    private fb: FormBuilder,
    private RegisterProvider: RegisterProvider
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
    });
   
  }
  send() {
    if (this.registerForm.valid) {
      console.log("submitted", this.registerForm.value);
    } else {
      console.log("error", this.registerForm.controls);
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

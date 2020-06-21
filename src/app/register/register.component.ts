import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import { RegisterService } from "../provider/register.service";
import {User} from "../model/user";
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
  userForm  = new User()
  registerForm: any;
  role = {
  user : false,
  admin : false,
  pm : false
  }

  constructor(
    private fb: FormBuilder,
    private registerProvider: RegisterService
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
    console.log(this.role)
    if (this.registerForm.valid) {
      console.log("submitted", this.registerForm.value);
    } else {
      console.log("error", this.registerForm.controls);
    }
  }
  getData() {
    console.log('i')
    this.registerProvider.getData().subscribe(
      rs => {
        console.log(rs);
      },
      error => {}
    );
    //untuk lazy load backend harus menyediakan limit offset dan total element
    /* */
  }
}

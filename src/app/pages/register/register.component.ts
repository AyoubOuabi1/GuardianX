import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {RegistrationDto} from "../../models/user/registrationDto.module";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}
  ngOnInit() {

  }
  onSubmit(formLogin : NgForm){
    if (!formLogin.valid) {
      return;
    }
    const user : RegistrationDto  = {
      username: formLogin.value.username,
        email: formLogin.value.email,
        password: formLogin.value.password

    };
    this.authService.register(user).subscribe({
      next: user => {
        console.log(user);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}

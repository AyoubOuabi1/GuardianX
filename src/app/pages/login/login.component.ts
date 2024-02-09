import {Component, OnInit,OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy {
   errorMeassge! : String;
   authUserSub! : Subscription;

   constructor(private authService: AuthService,
               private router: Router) {
   }
   ngOnInit() {
     this.authUserSub = this.authService.AuthenticatedUser$.subscribe(user => {
       if(user) {
         this.router.navigate(['/home']);
       }
     })
   }

   ngOnDestroy() {
     this.authUserSub.unsubscribe();
   }

   onSubmit(formLogin : NgForm){
      if (!formLogin.valid) {
        return;
      }
      this.authService.login(
        formLogin.value.email, formLogin.value.password).subscribe({
          next: user => {
            if(user) {
              this.router.navigate(['/home']);
            }

          },
          error: error => {
            this.errorMeassge = error.error.message;
          }
        })
   }

}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isUserLogged = false;
  userInfo = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    constructor(private loginService: LoginService, public router: Router){}

  onSubmit(){
    this.isUserLogged = this.loginService.logIn(this.userInfo.controls['username'].value, this.userInfo.controls['password'].value);
    if (this.isUserLogged){
      this.router.navigate(['/home']);
    }else{
      alert("Errore, username o password errati");
    }
  }
}

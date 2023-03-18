import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myForecast';
  isLoggedUser= false;

  constructor(private loginService: LoginService){

  }

  ngOnInit(): void {
    setInterval(()=>{
      this.isLoggedUser = this.loginService.loggedStatus()
    }, 100)

  }


}

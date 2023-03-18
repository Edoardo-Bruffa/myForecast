import { HttpClient } from '@angular/common/http';
import { Component,  ElementRef } from '@angular/core';
import { CoordCaclulatorService } from 'src/app/service/coord-caclulator.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  nomeUtente = localStorage.getItem('nomeUtente');

  constructor(private router: Router){}

  logOut(){
    localStorage.removeItem("nomeUtente");
    this.router.navigateByUrl("/login")
  }
}

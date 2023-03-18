import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged = false;
  nome = 'user';
  password = 'user';

  constructor() { }

  logIn(nomeUtente: string | null, passwordUtente: string | null){
    if(this.nome == nomeUtente && this.password == passwordUtente){
      this.isLogged = true;
      localStorage.setItem("nomeUtente", nomeUtente)
    }
    return this.isLogged;
  }

  logOut(){
    this.isLogged = false;
    return this.isLogged;
  }

  loggedStatus(){
    return this.isLogged;
  }
}

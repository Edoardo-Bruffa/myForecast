import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged = false;
  nome = 'user';
  password = 'user';

  constructor() { }

  logIn(nomeUtente: string | null, passwordUtente: string | null){ //verifico l'utente sia registrato e login
    if(this.nome == nomeUtente && this.password == passwordUtente){
      this.isLogged = true;
      localStorage.setItem("nomeUtente", nomeUtente)
    }
  }

  loggedStatus(){ // ritorno
    return this.isLogged;
  }
}

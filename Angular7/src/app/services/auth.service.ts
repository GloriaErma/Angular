import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  readonly ISLOGGEDKEY = 'UsuarioIsLogged';
  public urlUsusarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  login(){
    localStorage.setItem(this.ISLOGGEDKEY,'true');  // (key, value)
    this.changeLoginStatusSubject.next(true);
  }

  logout(){
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isloggedIn(url: string){
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if (!isLogged){
      this.urlUsusarioIntentaAcceder = url;
      return false;
    }
    return true;
  }

}

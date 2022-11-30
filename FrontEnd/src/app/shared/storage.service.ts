import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { InfoToken } from '../classes/InfoToken';


@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession: InfoToken = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: InfoToken): void {
    this.currentSession = session;
    this.localStorageService.setItem('tokenInfo', JSON.stringify(session));
  }

  loadSessionData(): InfoToken{
    const sessionStr = this.localStorageService.getItem('tokenInfo');
    return (sessionStr) ? <InfoToken>JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): InfoToken {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('tokenInfo');
    this.currentSession = null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken(): string {
    const session = this.getCurrentSession();
    return (session && session.TokenAcceso) ? session.TokenAcceso : null;
  }

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/Login']);
  }
}

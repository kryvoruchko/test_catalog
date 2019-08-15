import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../environments/environment';
import { UserInterface } from '../models/user';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.url;
  public username: string;

  constructor(
    private _http: HttpClient
  ) { }

  /**
   * Sign up
   * @param {UserInterface} data
   * @returns {Observable<any>}
   */
  public signUp(data: UserInterface): Observable<any> {
    return this._http.post(this.url + 'api/register/', data);
  }

  /**
   * Login
   * @param {UserInterface} data
   * @returns {Observable<any>}
   */
  public login(data: UserInterface): Observable<any> {
    return this._http.post(this.url + 'api/login/', data);
  }

  /**
   * Log out
   */
  public logOut(): void {
    localStorage.removeItem('tokenApp');
    localStorage.removeItem('username');
  }

  public getToken(): string {
    this.username = localStorage.getItem('username');
    return localStorage.getItem('tokenApp');
  }

  /**
   * Check token
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    const token = this.getToken();
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }
}

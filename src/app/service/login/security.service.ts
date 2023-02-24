import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { AppUser } from '../../models/login/app-user';
import { AppUserAuth } from '../../models/login/app-user-auth';
import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private http: HttpClient) { }

  resetSecuriryObject(){
    this.securityObject.username = '';
    this.securityObject.token = '';
  }

  login(entity:AppUser){

    this.resetSecuriryObject();

    return this.http.post(`${API_URL}login`,entity,httpOptions)
    .pipe(
      tap((resp: AppUserAuth)=>{
        Object.assign(this.securityObject, resp);
        sessionStorage.setItem('token',this.securityObject.token);
        localStorage.setItem('key',environment.SECRET_KEY)
      }),
      catchError(this.handleError)
    )
  }

  logout(){
    this.resetSecuriryObject();
    sessionStorage.removeItem('token');
    localStorage.removeItem('key');
  }

  handleError(err:any){
    return throwError(err.error);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/login/app-user';

const API_URL = 'http://localhost:3000/users/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  getAppUsers(): Observable<AppUser[]>{
    return this.http.get<AppUser[]>(API_URL);
  }

  getAppUser(id:number): Observable<AppUser>{
    return this.http.get<AppUser>(`${API_URL}${id}`)
  }

  addAppUser(entity:AppUser): Observable<any>{
    return this.http.post(API_URL, entity, httpOptions);
  }

  updateAppUser(id:number,entity:AppUser): Observable<any>{
    return this.http.put(`${API_URL}${id}`, entity, httpOptions);
  }

  deleteAppUser(id:number){
    return this.http.delete(`${API_URL}${id}`, httpOptions);
  }
}
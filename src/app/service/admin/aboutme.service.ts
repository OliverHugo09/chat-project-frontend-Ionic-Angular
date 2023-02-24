import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aboutme } from '../../models/admin/aboutme';

const API_URL = environment.API_URL + '/aboutme/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AboutmeService {

  constructor(private http: HttpClient) { }

  getAboutmes(): Observable<Aboutme[]>{
    return this.http.get<Aboutme[]>(API_URL);
  }

  getAboutme(id:number): Observable<Aboutme>{
    return this.http.get<Aboutme>(`${API_URL}${id}`)
  }

  updateAboutme(id:number,entity:Aboutme): Observable<any>{
    return this.http.put(`${API_URL}${id}`, entity, httpOptions);
  }

}
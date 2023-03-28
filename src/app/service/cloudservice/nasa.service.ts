import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APOD } from '../../models/cloud/apod';

const API_NASA = environment.API_NASA + environment.NASA_KEY;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class NasaService {
    APOD: any;

  constructor(private http: HttpClient) { }

  getAPOD(): Observable<APOD>{
    return this.http.get<APOD>(`${API_NASA}`)
  }

}
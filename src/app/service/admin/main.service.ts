import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Main } from '../../models/admin/main';

const API_URL = 'http://localhost:3000/main/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getMains(): Observable<Main[]>{
    return this.http.get<Main[]>(API_URL);
  }

  getMain(id:number): Observable<Main>{
    return this.http.get<Main>(`${API_URL}${id}`)
  }

  updateMain(id:number,entity:Main): Observable<any>{
    return this.http.put(`${API_URL}${id}`, entity, httpOptions);
  }

}
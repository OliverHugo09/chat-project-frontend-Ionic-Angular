import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ChatRoom } from '../../models/chat/chatroom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = environment.API_URL + 'chatrooms/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private url = environment.API_URL;

  constructor(private http: HttpClient ) {
  }

  createChatRoom2(id_usuario_1: number, id_usuario_2: number): Observable<any>{
    const entity: ChatRoom = {
      id_usuario_1: id_usuario_1,
      id_usuario_2: id_usuario_2,
    };
    return this.http.post(API_URL, entity, httpOptions);
  }

  createChatRoom(id_usuario_1: number, id_usuario_2: number): Observable<any> {
    const entity: ChatRoom = {
      id_usuario_1: id_usuario_1,
      id_usuario_2: id_usuario_2,
    };
    return this.http.post(API_URL, entity, httpOptions);
  }
  

}
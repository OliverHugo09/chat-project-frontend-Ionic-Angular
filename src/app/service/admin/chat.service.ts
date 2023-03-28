import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebSocketService } from '../socket/web-socket.service';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/models/chat/message';

const API_URL_BYCHATROOM = environment.API_URL + 'messages/getbychatroom/';
const API_URL = environment.API_URL + 'messages/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    chats= [];
    feedback: string;
    ChatMessage: any;
    chatRooms: any[] = [];

  constructor(public socket:WebSocketService, private http: HttpClient) { 
    this.onReceiveMessage();
  }

  sendMessage2(messageInfo){
    this.chats.push(messageInfo);
    this.socket.emit("sendMessage2", messageInfo);
  }

  onReceiveMessage(){
    this.socket.on("receiveMessage", (messageInfo) => {
        messageInfo.messageType = 2;
        this.chats.push(messageInfo);
        setTimeout(() => {
          document.getElementById("send")?.scrollIntoView({behavior:"smooth"});
          document.getElementById("recive")?.scrollIntoView({behavior:"smooth"});
        }, 100);
    });
}

  getMessages(id:number): Observable<Message[]>{
    return this.http.get<Message[]>(`${API_URL_BYCHATROOM}${id}`)
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(API_URL, message, httpOptions);
  }

}
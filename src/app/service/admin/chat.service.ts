import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebSocketService } from '../socket/web-socket.service';

const API_URL = environment.API_URL + '/aboutme/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    chats= [];
    feedback: string;

  constructor(public socket:WebSocketService) { 
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

}
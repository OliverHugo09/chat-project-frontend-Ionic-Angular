import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WebSocketService } from '../socket/web-socket.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class TypingService {

  constructor(public socket:WebSocketService) { }

  sendMessageTyping(): void {
    this.socket.emit('typing');
  }

  sendMessageStopTyping(): void {
    this.socket.emit('stopTyping');
  }

  onTyping(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('typing', (data: any) => {
        observer.next(data);
      });
    });
  }

  onStopTyping(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('stopTyping', (data: any) => {
        observer.next(data);
      });
    });
  }
}
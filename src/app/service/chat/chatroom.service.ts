import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private socket: Socket;
  private url = environment.API_URL;
  constructor() {
    this.socket = io(this.url);
  }

  createChatRoom(userId: string, otherUserId: string): Observable<{ chatRoomId: string }> {
    this.socket.emit('create chatroom', { userId, otherUserId });
    return new Observable<{ chatRoomId: string }>(observer => {
      this.socket.on('chatroom created', (data: { chatRoomId: string }) => {
        observer.next(data);
      });
      this.socket.on('create chatroom error', (error: string) => {
        observer.error(error);
      });
    });
  }
}
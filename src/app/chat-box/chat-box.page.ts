import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/admin/chat.service';
import { WebSocketService } from '../service/socket/web-socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.page.html',
  styleUrls: ['./chat-box.page.scss'],
})
export class ChatBoxPage implements OnInit {

  userName: string;
  output: any[] = [];
  text= "";
  isTyping: boolean = false;

  constructor(public webSocketService: WebSocketService, public chat:ChatService) { }
  ngOnInit(): void {

    this.webSocketService.listen('typing').subscribe(() => {
      this.isTyping = true;
    });

    this.webSocketService.listen('stopTyping').subscribe(() => {
      this.isTyping = false;
    });
  }

  sendMessage2(){
    let messageInfo = {
      text:this.text,
      messageType: 1
    };
    this.chat.sendMessage2(messageInfo);
    this.text = "";
  }

}
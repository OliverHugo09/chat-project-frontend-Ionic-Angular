import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../service/admin/chat.service';
import { WebSocketService } from '../service/socket/web-socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.page.html',
  styleUrls: ['./chat-box.page.scss'],
})
export class ChatBoxPage implements OnInit {

  userName: string;
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
    setTimeout(() => {
      document.getElementById("send")?.scrollIntoView({behavior:"smooth"});
      document.getElementById("recive")?.scrollIntoView({behavior:"smooth"});
    }, 100);
    const inputField = document.getElementById('ion-input') as HTMLInputElement;
    inputField.addEventListener('keyup', (event) => {
      if(event.key === 'Enter'){
        this.webSocketService.sendStopTyping();
      }
    });
  }

  onInputChanged(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.trim() === '') {
      this.webSocketService.sendStopTyping();
    }
  }

}
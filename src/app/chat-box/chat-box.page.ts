import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ChatService } from '../service/admin/chat.service';
import { WebSocketService } from '../service/socket/web-socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.page.html',
  styleUrls: ['./chat-box.page.scss'],
})
export class ChatBoxPage implements OnInit {
  @Input() chatRoom: any;
  userName: string;
  text= "";
  isTyping: boolean = false;
  messages: any[] = [];
  activeUserId: number;
  receiverId: number;
  chatroomId: number;
  messageText: string;

  constructor(public webSocketService: WebSocketService, public chat:ChatService, private route: ActivatedRoute,) { }
  ngOnInit(): void {

    this.chatroomId = +this.route.snapshot.paramMap.get('id');

    this.loadMessages();

    this.loadlastmessage();

    this.activeUserId = parseInt(localStorage.getItem('activeUserId'));
    this.receiverId = parseInt(localStorage.getItem('receiverId'));

    this.webSocketService.listen('typing').subscribe(() => {
      this.isTyping = true;
    });

    this.webSocketService.listen('stopTyping').subscribe(() => {
        this.isTyping = false;
    });

    this.webSocketService.listen('newMessage').subscribe((message) => {
      this.messages.push(message);
      console.log(message.receiverId);
      setTimeout(() => {
        document.getElementById("sender")?.scrollIntoView({behavior:"smooth"});
        document.getElementById("recive")?.scrollIntoView({behavior:"smooth"});
      }, 500);
    });

    
  }

  loadlastmessage(){
    setTimeout(() => {
      document.getElementById("sender")?.scrollIntoView({behavior:"smooth"});
      document.getElementById("recive")?.scrollIntoView({behavior:"smooth"});
    }, 500);
  }

  onInputChanged(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.trim() === '') {
      this.webSocketService.sendStopTyping();
    }
  }

  loadMessages() {
    setTimeout(() => {
      document.getElementById("sender")?.scrollIntoView({behavior:"smooth"});
      document.getElementById("recive")?.scrollIntoView({behavior:"smooth"});
    }, 500);
    this.chat.getMessages(this.chatroomId).subscribe(
      messages => {
        this.messages = messages;

      },
      error => {
        console.error(error);
      }
    );
    setTimeout(() => {
      document.getElementById("sender")?.scrollIntoView({behavior:"smooth"});
      document.getElementById("recive")?.scrollIntoView({behavior:"smooth"});
    }, 500);
  }

  sendMessage(messageText: string) {
    const message = {
      chatRoomId: this.chatroomId,
      senderId: this.activeUserId,
      content: messageText,
      receiverId: this.receiverId,
    };
    this.chat.sendMessage(message).subscribe(
      () => {
        this.messageText = "";
      },
      error => {
        console.error(error);
      }
    );
    const inputField = document.getElementById('ion-input') as HTMLInputElement;
    inputField.addEventListener('keyup', (event) => {
      if(event.key === 'Enter'){
        this.webSocketService.sendStopTyping();
      }
    });
    setTimeout(() => {
      document.getElementById("sender")?.scrollIntoView({behavior:"smooth"});
      document.getElementById("recive")?.scrollIntoView({behavior:"smooth"});
    }, 500);
  }

}
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ChatService } from '../service/admin/chat.service';
import { WebSocketService } from '../service/socket/web-socket.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../service/register/register.service';
import { AppUser } from '../models/login/app-user';
import { Subscription } from 'rxjs';

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
  activeChatRoomId: number;
  chatroomId: number;
  messageText: string;
  showChatBox: boolean = false;
  receiver: AppUser;
  sender: AppUser;


  private subscriptions: Array<Subscription> = [];

  constructor(public webSocketService: WebSocketService, public chat:ChatService, private route: ActivatedRoute, private service: RegisterService) { }
  ngOnInit(): void {

    this.chatroomId = +this.route.snapshot.paramMap.get('id');

    this.loadMessages();

    this.activeUserId = parseInt(localStorage.getItem('activeUserId'));
    this.receiverId = parseInt(localStorage.getItem('receiverId'));
    this.activeChatRoomId = parseInt(localStorage.getItem('activeChatRoomId'));
    this.showChatBox = true;

    this.service.getAppUser(this.receiverId).subscribe(
      user => {
        this.receiver = user;
        console.log(this.receiver);
        // Realiza cualquier acción necesaria con el usuario obtenido
      },
      error => {
        console.error(error);
      }
    );

    this.service.getAppUser(this.activeUserId).subscribe(
      user => {
        this.sender = user;
        console.log(this.sender);
        // Realiza cualquier acción necesaria con el usuario obtenido
      },
      error => {
        console.error(error);
      }
    );

    this.webSocketService.listen('newMessage').subscribe((message) => {
      setTimeout(() => {
        if (message.chatRoomId === this.chatroomId) {
          this.messages.push(message);
          console.log(message);
          setTimeout(() => {
            document.getElementById("sender")?.scrollIntoView({behavior:"smooth"});
            document.getElementById("recive")?.scrollIntoView({behavior:"smooth"});
          }, 400);
        }
      }, 100);

    });

    this.webSocketService.listen('typing').subscribe(() => {
      this.isTyping = true;
    });

    this.webSocketService.listen('stopTyping').subscribe(() => {
      this.isTyping = false;
    });

  }

  onInputChanged(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.trim() === '') {
      this.webSocketService.sendStopTyping();
    }
  }

  loadMessages() {
    this.chat.getMessages(this.chatroomId).subscribe(
      messages => {
        this.messages = messages;
        console.log(messages);
        console.log(messages[0].chatRoomId);
        const receivercheck = messages[0].receiverId;
        const sendercheck = messages[0].senderId;
        localStorage.setItem('activeChatRoomId', messages[0].chatRoomId.toString());
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
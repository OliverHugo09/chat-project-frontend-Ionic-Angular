import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from './web-socket.service';

import { IonicModule } from '@ionic/angular';

import { ChatBoxPageRoutingModule } from './chat-box-routing.module';

import { ChatBoxPage } from './chat-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatBoxPageRoutingModule,

  ],
  declarations: [ChatBoxPage],
  providers: [WebSocketService]
})
export class ChatBoxPageModule {}

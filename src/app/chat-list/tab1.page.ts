import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/login/app-user';
import { RegisterService } from '../service/register/register.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChatroomService } from '../service/chat/chatroom.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  private subscriptions: Array<Subscription> = [];
  users: AppUser[];
  activeUserId: number;
  isCreatingChatroom: boolean = false;

  constructor(private service: RegisterService, private ChatroomService: ChatroomService) { }

  ngOnInit(): void {
    const newSubs = this.service.getAppUsers().subscribe(
      next => this.users = next
    );
    this.subscriptions.push(newSubs);

    this.activeUserId = parseInt(localStorage.getItem('activeUserId'));
/*     let id = +this.route.snapshot.paramMap.get('id');
    this.createOrLoadProduct(id); */
  }

  

  createChatroom(id_usuario_1: number, id_usuario_2: number) {
    this.ChatroomService.createChatRoom2(this.activeUserId, id_usuario_2).subscribe((chatroom: any) => {
      const receiverId = id_usuario_2;
      localStorage.setItem('receiverId', receiverId.toString());
      window.location.href = `/chat-box/${chatroom.id}`;
    });
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
   }
 }



}
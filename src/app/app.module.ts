import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorModule } from 'src/app/service/admin/interceptor.module';
import { HttpClientModule } from '@angular/common/http';
import { WebSocketService } from '../app/service/socket/web-socket.service';
import { RegisterPageModule } from './register/register.module';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,HttpInterceptorModule,RegisterPageModule],
  exports: [CommonModule,FormsModule,ReactiveFormsModule],
  providers: [ModalController,WebSocketService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

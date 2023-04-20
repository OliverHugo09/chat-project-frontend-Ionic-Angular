import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/login/app-user';
import { AppUserAuth } from '../models/login/app-user-auth';
import { SecurityService } from '../service/login/security.service';
import { AuthenGuard } from '../service/admin/authen.guard';
import { RegisterService } from '../service/register/register.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl = 'chat-online/chat-list';
  errorMessage = '';
  
  constructor(
    private service: SecurityService,
    private router: Router,
    private check: AuthenGuard,
    private userfind: RegisterService
  ) {}

  resetObject(){
    this.user.username = '';
    this.user.password = '';
  }

  ngOnInit(): void {}

  login(){
    this.errorMessage = '';
    this.service.login(this.user).subscribe(
      resp =>{
        this.securityObject = resp;
        this.resetObject();
        this.router.navigateByUrl(this.returnUrl);
      }
    ),
    error => this.errorMessage = error
  }

}

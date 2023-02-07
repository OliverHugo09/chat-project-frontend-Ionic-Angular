import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/login/app-user';
import { RegisterService } from '../service/register/register.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  user: AppUser = new AppUser();
  returnUrl = '/login'

  constructor(
    private userService: RegisterService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

  }

  addUser() {{
      this.userService.addAppUser(this.user).subscribe(
        next => this.user = next,
        () => null,
        () => this.dataSaved()
      )
    }
  }

  dataSaved() {
    this.goBack();
  }

  cancel() {
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

}

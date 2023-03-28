import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/login/app-user';
import { RegisterService } from '../service/register/register.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  user: AppUser = new AppUser();
  returnUrl = '/login';
  public usercheck: any = {
    agree: false,
  };

  constructor(
    private userService: RegisterService,
    private route: ActivatedRoute,
    private location: Location,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.initProfile();
  }

  async closeTerms() {
    return await this.modalController.dismiss();
  }

  initProfile() {
    this.user.avatar = 'https://via.placeholder.com/150x150';
  }

  addUser(): void {{
    if (!this.usercheck.agree) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
  
    // Verificamos que se haya ingresado un nombre de usuario y una contraseña
    if (!this.user.username || !this.user.password) {
      alert('Debes ingresar un nombre de usuario y una contraseña');
      return;
    }
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

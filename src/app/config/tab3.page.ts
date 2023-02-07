import { Component, Renderer2 } from '@angular/core';
import { SecurityService } from '../service/login/security.service';
import { AppUserAuth } from '../models/login/app-user-auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkMode: boolean = true;

  securityObject: AppUserAuth = null;

  constructor(private render: Renderer2, private service: SecurityService) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;

    this.securityObject = this.service.securityObject;
  }


  toggleTheme(event){
    if (event.detail.checked){
      //document.body.setAttribute('color-theme', 'dark')
      this.render.setAttribute(document.body, 'color-theme', 'dark')
    }else{
      //document.body.setAttribute('color-theme', 'light')
      this.render.setAttribute(document.body, 'color-theme', 'light')
    }
  }

  logout() {
    this.service.logout();
  }

}

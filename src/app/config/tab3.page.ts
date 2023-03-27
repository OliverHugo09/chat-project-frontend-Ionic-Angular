import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { SecurityService } from '../service/login/security.service';
import { AppUserAuth } from '../models/login/app-user-auth';
import { RegisterService } from '../service/register/register.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const API_IMAGE = environment.API_IMAGE;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkMode: boolean = true;

  securityObject: AppUserAuth = null;
  activeUserId: number;

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(private render: Renderer2, private service: SecurityService, private registerService: RegisterService, private http: HttpClient) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;

    this.securityObject = this.service.securityObject;

    this.activeUserId = this.registerService.getActiveUserId();
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

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('avatar', file, file.name);

      this.http.post(API_IMAGE+this.activeUserId+'/avatar', formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onAddImageClick() {
    this.fileInput.nativeElement.click();
  }

  logout() {
    this.service.logout();
  }

}

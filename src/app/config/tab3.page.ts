import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkMode: boolean = true;

  constructor(private render: Renderer2) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
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

}

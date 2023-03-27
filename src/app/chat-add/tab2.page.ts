import { Component, OnInit } from '@angular/core';
import { NasaService } from '../service/cloudservice/nasa.service';
import { APOD } from '../models/cloud/apod';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  apod: APOD;

  constructor(private nasaService: NasaService, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {

    this.nasaService.getAPOD().subscribe(
      apod => {
        this.apod = apod;
        // Realiza cualquier acción necesaria con el usuario obtenido
      },
      error => {
        console.error(error);
      }
    );

  }



}

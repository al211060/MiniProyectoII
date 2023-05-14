import { Component } from '@angular/core';
import { BuscarService } from '../buscar.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private buscarService: BuscarService) {}

  buscar() {
    const VB = (<HTMLInputElement>document.getElementById("buscar")).value.toLowerCase().trim();
    if(!this.buscarService.buscando(VB)){
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.error("No existe ningun platillo con ese nombre");
    }
    (<HTMLInputElement>document.getElementById("buscar")).value= "";
  }
}

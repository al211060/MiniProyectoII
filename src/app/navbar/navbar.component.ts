import { Component } from '@angular/core';
import { BuscarService } from '../buscar.service';
import { AuthService } from '../auth-service.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  email: string = '';
  password: string = '';
  
  constructor(private buscarService: BuscarService, public authService: AuthService) {}


  signUp() {
    this.authService.signUp(this.email, this.password);
  }

  signIn() {
    this.authService.signIn(this.email, this.password);
  }

  signOut() {
    this.authService.signOut();
  }

  logout(): void {
    this.authService.signOut();
  }
  


  buscar() {
    const VB = (<HTMLInputElement>document.getElementById("buscar")).value.toLowerCase().trim();
    if(!this.buscarService.buscando(VB)){
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.error("No existe ningun platillo con ese nombre");
    }
    (<HTMLInputElement>document.getElementById("buscar")).value= "";
  }
}

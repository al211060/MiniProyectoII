import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  platoSeleccionado: any;
  seleccion:boolean = false;

  mostrarPlato(nombre: any) {
    this.platoSeleccionado = nombre;
    this.seleccion = true;
    console.log("Mostrar plato"+this.seleccion);
  }
}

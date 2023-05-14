import { Component, EventEmitter, Output } from '@angular/core';
import { Items } from '../items.model';

@Component({
  selector: 'app-listado-items',
  templateUrl: './listado-items.component.html',
  styleUrls: ['./listado-items.component.css']
})
export class ListadoItemsComponent {
  platos:any[] = Items;
  @Output() platoSeleccionado = new EventEmitter<any>();

  seleccionarPlato(plato: any) {
    this.platoSeleccionado.emit(plato);
  }
}

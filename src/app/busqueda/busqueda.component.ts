import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscarService } from '../buscar.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  item:any;

  constructor(private rutaActiva: ActivatedRoute, private buscarService: BuscarService) { }

  ngDoCheck() {
    this.item = this.buscarService.regresarItem(this.rutaActiva.snapshot.params['item']);
  }
}

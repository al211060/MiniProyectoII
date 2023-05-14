import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Items } from './items.model';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  items:any[] = [];
  
  constructor(private router: Router, ) { 
    this.items = Items;
  }

  regresarItem(ruta:string):any{
    for(let item of this.items){
      var temp = item.nombre.trim();
      if(temp === ruta){
        return item;
      }
    }
  }

  buscando(busqueda:string):boolean{
    for(let item of this.items){
      console.log(item.nombre+' '+busqueda);
      var temp = item.nombre.toLowerCase().trim();
      if(temp.includes(busqueda)){
        this.router.navigate(['/busqueda/'+item.nombre.trim()]);
        return true;
      }
    }
    return false
  }
}

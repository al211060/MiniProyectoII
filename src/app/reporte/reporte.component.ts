import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  reservations:any[];

  constructor(){
    const reservationsString = localStorage.getItem('reservations');
    this.reservations = reservationsString ? this.reservationsTransform(JSON.parse(reservationsString)): [];
  }

  reservationsTransform(reservations:any){
    var temp = [];
    var fecha;
    var fechaR;
    for(let r of reservations){
      switch(r.mes){
        case 'enero' : fecha = r.diaNum+"/01/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'febrero' : fecha = r.diaNum+"/02/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'marzo' : fecha = r.diaNum+"/03/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'abril' : fecha = r.diaNum+"/04/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'mayo' : fecha = r.diaNum+"/05/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'junio' : fecha = r.diaNum+"/06/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'julio' : fecha = r.diaNum+"/07/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'agosto' : fecha = r.diaNum+"/08/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'septiembre' : fecha = r.diaNum+"/09/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'octubre' : fecha = r.diaNum+"/10/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'noviembre' : fecha = r.diaNum+"/11/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
        case 'diciembre' : fecha = r.diaNum+"/12/"+r.año; fechaR = r.año+"/01/"+r.diaNum; break;
      }
      fechaR = fechaR+" "+r.hora+":00:00";
      temp.push({
        fecha:fecha,
        hora:r.hora+":00",
        nombre:r.nombre,
        visitantes:r.visitantes,
        timestamp: new Date(fechaR!).getTime()/1000
      });
    }
    return temp.sort((a, b) => a.timestamp - b.timestamp);
  }
}

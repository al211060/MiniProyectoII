import { AfterViewChecked, Component } from '@angular/core';
import { Database, onValue, ref, remove, set } from '@angular/fire/database';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements AfterViewChecked{
  reservaciones!:any[];
  reservacionesAux!:any[];

  constructor(public database: Database, public authService: AuthService, private router: Router){
    if(!authService.isLoggedIn()){
      this.router.navigate(['/']);
    }
    /*const reservationsString = localStorage.getItem('reservations');
    this.reservaciones = reservationsString ? this.reservationsTransform(JSON.parse(reservationsString)): [];*/
    onValue(ref(this.database, 'reservations/'), (snapshot) => {
      var temp:any =[];
      this.reservaciones = [];
      this.reservacionesAux = [];
      snapshot.forEach((childSnapshot)=>{
        temp.push(childSnapshot.val());
        this.reservacionesAux.push(childSnapshot.key);
      });
      this.reservaciones = this.reservationsTransform(temp,this.reservacionesAux);
    });
  }

  reservationsTransform(reservations:any, aux:any){
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
        timestamp: new Date(fechaR!).getTime()/1000,
        key: aux[reservations.indexOf(r)],
        cuenta: r.cuenta
      });
    }
    temp.sort((a, b) => a.timestamp - b.timestamp);

    /*console.log("isLoggedIn "+this.authService.isLoggedIn());
    console.log("isAdmin "+this.authService.isAdmin());
    console.log("User email "+this.authService.user?.email);*/
    console.log(this.authService.user);
    
    if(this.authService.isLoggedIn() && !this.authService.isAdmin()){
      //console.log(temp);
      for(let t of temp){
        //console.log("T cuenta "+t.cuenta);
        //console.log("index "+temp.indexOf(t));
        if(this.authService.user?.email != t.cuenta){
          //console.log(temp[temp.indexOf(t)]);
          temp.splice(temp.indexOf(t),1);
        }
        //console.log("continua despues de if");
      }
      //console.log("sale del for")
    }
    //console.log(temp);
    return temp;
  }

  ngAfterViewChecked(){
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  eliminarCita(key:number){
    remove(ref(this.database, 'reservations/'+key));
    //set(ref(this.database, 'reservations/'),this.reservaciones);
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.warning("La reservación se ha cancelado");
  }
}

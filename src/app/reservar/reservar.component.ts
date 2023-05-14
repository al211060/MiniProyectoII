import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent {
  registro: Registro = {
    hora:0,
    visitantes:0,
    diaNum:0,
    mes:'',
    año:0
  };
  selectedDate = new Date();
  selectedDate2 = new Date();
  startAt = new Date();
  minDate = new Date();
  horasDisp:number[]=[];
  day:any;
  selectedVisitors:number = 0;
  selectedTime:number = 0;
  valid:boolean = true;
  reservations:any[]=[];
  tabla:Tabla[]=[]
  displayedColumns: string[] = ['hora', 'visitantes'];

  constructor(private dateAdapter: DateAdapter<Date>){
    this.dateAdapter.setLocale('es-mx');
    this.calendarChange(this.selectedDate);
    const reservationsString = localStorage.getItem('reservations');
    this.reservations = reservationsString ? JSON.parse(reservationsString): [];
    for(let i=8; i<23; i++){
      if(i>parseInt(formatDate(new Date(),"H","es"))){
        this.horasDisp.push(i);
      }
      this.tabla.push({     
        hora:i,    
        visitantes:0, 
        disponibilidad: 'true'
      });
    }
  }

  resetTabla(){
    for(let i=0; i<15; i++){
      this.tabla[i]={    
        hora:i+8,    
        visitantes:0,
        disponibilidad: 'true'
      };
    }
  }

  construirTabla(tempr:any){
    this.tabla=[];
    this.resetTabla();
    const reservationsString = localStorage.getItem('reservations');
    const reservations = reservationsString ? JSON.parse(reservationsString) : [];
    for(let r of reservations){
      console.log(r);
      if(r.diaNum === tempr.diaNum && r.mes === tempr.mes && r.año === tempr.año ){
        this.tabla[this.tabla.findIndex(x => x.hora === r.hora)].hora=r.hora;
        this.tabla[this.tabla.findIndex(x => x.hora === r.hora)].visitantes=r.visitantes;
        this.tabla[this.tabla.findIndex(x => x.hora === r.hora)].disponibilidad='false';
      }
    }
  }

  calendarChange(event: any) {
    this.selectedDate = event;
    var dateValue:any = formatDate(event,"cccc d LLLL y","es").split(' ');
    this.registro.diaNum = dateValue[1];
    this.registro.mes = dateValue[2];
    this.registro.año = dateValue[3];
    this.day = dateValue[0];
  }

  calendarChangeT(event: any) {
    this.selectedDate2 = event;
    var dateValue:any = formatDate(event,"cccc d LLLL y","es").split(' ');
    var tempr={  
      diaNum:dateValue[1],  
      mes:dateValue[2],
      año:dateValue[3]
    }
    this.construirTabla(tempr);
  }
  
  selectChange() {
    if(this.selectedVisitors != 0 && this.selectedTime != 0 ){
      this.valid = false;
    }else if(this.selectedVisitors == 0 || this.selectedTime == 0 ){
      this.valid = true;
    }
  }

  myDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0; 
  }

  registrarReservacion(){
    this.registro.hora = this.selectedTime;
    this.registro.visitantes = this.selectedVisitors;

    this.selectedVisitors = 0;
    this.selectedTime = 0;
    this.selectChange();

    console.log(this.registro);

    const reservationsString = localStorage.getItem('reservations');
    const reservations = reservationsString ? JSON.parse(reservationsString) : [];

    const isOccupied = reservations.some((reservation: Registro) =>
      reservation.diaNum === this.registro.diaNum && reservation.mes === this.registro.mes && reservation.año === this.registro.año && reservation.hora === this.registro.hora
    );
    console.log(isOccupied);

    if (this.day === "domingo") {
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.warning("Los domingos no hay servicio, Porfavor elija otra fecha");
    } else if (isOccupied) {
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.error("Lo sentimos, una cita ya existe registrada.");
    } else {
      reservations.push(this.registro);
      localStorage.setItem('reservations', JSON.stringify(reservations));
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.success("Reservacion realizada con exito");
    }
  }

  /*ngDoCheck(){
    const reservationsString = localStorage.getItem('reservations');
    this.reservations = reservationsString ? JSON.parse(reservationsString): [];
  }*/
}
interface Tabla{
  hora:number,
  visitantes:number,
  disponibilidad:string
}

interface Registro{
  hora:number,
  visitantes:number,
  diaNum:number,
  mes:string,
  año:number
}
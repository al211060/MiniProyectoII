import { formatDate } from '@angular/common';
import { AfterViewChecked, Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Database, onValue, push, ref, set } from '@angular/fire/database';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from '../auth-service.service';
import { EmailService } from '../email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements AfterViewChecked{
  registro: Registro = {
    cuenta:'',
    nombre:'',
    hora:0,
    visitantes:0,
    diaNum:0,
    dia:'',
    mes:'',
    año:0
  };

  datos: DatosReserva={
    nombre:'',
    hora:0,
    visitantes:0,
    diaNum:0,
    mes:'',
    año:0,
    email: ''
  };

  correoEnviado: Boolean = false;
  selectedDate = new Date();
  selectedDate2 = new Date();
  startAt = new Date();
  minDate = new Date();
  horasDisp:number[]=[];
  day:any;
  name:string = '';
  selectedVisitors:number = 0;
  selectedTime:number = 0;
  valid:boolean = true;
  reservaciones:any[]=[];
  reservacionesAux:any[]=[];
  tabla:Tabla[]=[]
  tableHeader:any;
  //displayedColumns: string[] = ['hora', 'visitantes'];
  displayedColumns: string[] = ['hora', 'disponibilidad'];

  constructor(private dateAdapter: DateAdapter<Date>, public database: Database, public authService: AuthService, private router: Router, public emailService: EmailService){
    this.dateAdapter.setLocale('es-mx');
    onValue(ref(this.database, 'reservations/'), (snapshot) => {
      if(snapshot.val() != null){
        //this.reservacionesAux2 = snapshot.val();
        this.reservaciones = [];
        this.reservacionesAux = [];
        snapshot.forEach((childSnapshot)=>{
          this.reservaciones.push(childSnapshot.val());
          this.reservacionesAux.push(childSnapshot.key);
        });
      }
      this.calendarChangeT(this.selectedDate2);
    });

    this.calendarChange(this.selectedDate);

    /*const reservationsString = localStorage.getItem('reservations');
    this.reservaciones = reservationsString ? JSON.parse(reservationsString): [];*/
    /*console.log(this.horasDisp);
    console.log(this.tabla);
    for(let i=8; i<23; i++){
      if(i>parseInt(formatDate(new Date(),"H","es"))){
        this.horasDisp.push(i);
      }
      this.tabla.push({     
        hora:i,    
        //visitantes:0, 
        disponibilidad: 'true'
      });
    }
    console.log(this.horasDisp);
    console.log(this.tabla);*/
  }

  ngAfterViewChecked(){
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  resetTabla(){
    this.tabla=[];
    for(let i=0; i<15; i++){
      this.tabla[i]={    
        hora:i+8,    
        //visitantes:0,
        disponibilidad: 'true'
      };
    }
  }

  construirTabla(tempr:any){
    this.resetTabla();
    /*const reservationsString = localStorage.getItem('reservations');
    const reservations = reservationsString ? JSON.parse(reservationsString) : [];
    for(let r of reservations){
      //console.log(r);
      if(r.diaNum === tempr.diaNum && r.mes === tempr.mes && r.año === tempr.año ){
        this.tabla[this.tabla.findIndex(x => x.hora === r.hora)].hora=r.hora;
        //this.tabla[this.tabla.findIndex(x => x.hora === r.hora)].visitantes=r.visitantes;
        this.tabla[this.tabla.findIndex(x => x.hora === r.hora)].disponibilidad='false';
      }
    }*/
    for(let r of this.reservaciones){
      if(r.diaNum === tempr.diaNum && r.mes === tempr.mes && r.año === tempr.año ){
        this.tabla[this.tabla.findIndex(x => x.hora === r.hora)].hora=r.hora;
        this.tabla[this.tabla.findIndex(x => x.hora === r.hora)].disponibilidad='false';
      }
    }
  }

  horasLimite(){
    for(let i=8; i<23; i++){
      if(i>parseInt(formatDate(new Date(),"H","es"))){
        this.horasDisp.push(i);
      }
    }
  }

  calendarChange(event: any) {
    this.selectedDate = event;
    var temp = formatDate(new Date(),"cccc d LLLL y","es").split(' ');
    var dateValue:any = formatDate(event,"cccc d LLLL y","es").split(' ');
    this.horasDisp = [];
    if(dateValue[1] === temp[1] && dateValue[2] === temp[2] && dateValue[3] === temp[3]){
      //console.log("Current Day");
      this.horasLimite();
    }else{
      //console.log("Not Today");
      this.horasDisp = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    }
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
    this.tableHeader = dateValue[0]+", "+dateValue[1]+" de "+dateValue[2]+" de "+dateValue[3];
    this.construirTabla(tempr);
  }
  
  selectChange() {
    if(this.selectedVisitors != 0 && this.selectedTime != 0 && this.name != ''){
      this.valid = false;
    }else if(this.selectedVisitors == 0 || this.selectedTime == 0 && this.name == ''){
      this.valid = true;
    }
  }

  myDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0; 
  }

  registrarReservacion(){
    this.registro.nombre = this.name;
    this.registro.hora = this.selectedTime;
    this.registro.visitantes = this.selectedVisitors;

    this.name = '';
    this.selectedVisitors = 0;
    this.selectedTime = 0;
    this.selectChange();

    //console.log(this.registro);

    /*const reservationsString = localStorage.getItem('reservations');
    const reservations = reservationsString ? JSON.parse(reservationsString) : [];

    const isOccupied = reservations.some((reservation: Registro) =>
      reservation.diaNum === this.registro.diaNum && reservation.mes === this.registro.mes && reservation.año === this.registro.año && reservation.hora === this.registro.hora
    );*/
    const isOccupied = this.reservaciones.some((reservation: Registro) =>
      reservation.diaNum === this.registro.diaNum && reservation.mes === this.registro.mes && reservation.año === this.registro.año && reservation.hora === this.registro.hora
    );
    //console.log(isOccupied);

    if (this.day === "domingo") {
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.warning("Los domingos no hay servicio, Porfavor elija otra fecha");
    } else if (isOccupied) {
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.error("Lo sentimos, una cita ya existe registrada.");
    } else {
      //reservations.push(this.registro);
      //localStorage.setItem('reservations', JSON.stringify(reservations));

      // Mandamos correo al usuario logueado

      this.datos.email = this.authService.user?.email ?? '';
      this.datos.nombre = this.registro.nombre;
      this.datos.hora = this.registro.hora;
      this.datos.diaNum = this.registro.diaNum;
      this.datos.visitantes = this.registro.visitantes;

      this.emailService.sendReservation(this.datos).subscribe(() => {
        this.correoEnviado = true;
      });

      if(this.correoEnviado){console.log("El correo de la Reservacion Comenzo su envio");}


      push(ref(this.database, 'reservations'),{
        cuenta: this.authService.user?.email,
        nombre:this.registro.nombre,
        hora:this.registro.hora,
        visitantes:this.registro.visitantes,
        diaNum:this.registro.diaNum,
        dia:this.day,
        mes:this.registro.mes,
        año:this.registro.año
      });
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.success("Reservacion realizada con exito");
      this.calendarChangeT(this.selectedDate2);
    }
  }

  /*ngDoCheck(){
    const reservationsString = localStorage.getItem('reservations');
    this.reservations = reservationsString ? JSON.parse(reservationsString): [];
  }*/
}

interface Tabla{
  hora:number,
  //visitantes:number,
  disponibilidad:string
}

interface Registro{
  cuenta:string,
  nombre:string,
  hora:number,
  visitantes:number,
  diaNum:number,
  dia:string,
  mes:string,
  año:number
}

interface DatosReserva{
  nombre:string,
  hora:number,
  visitantes:number,
  diaNum:number,
  mes:string,
  año:number,
  email: string
}
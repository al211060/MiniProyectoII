import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref, remove, set } from '@angular/fire/database';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore/lite';
import Chart from 'chart.js/auto';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent /*implements OnInit*/ {
  reservaciones!:any[];
  reservacionesAux!:any[];

  labelsD = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado']; 
  labelsH = ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']; 

  diaVal!:Dias;
  hrsVal!:Horas;

  constructor(public database: Database){
    /*const reservationsString = localStorage.getItem('reservations');
    this.reservaciones = reservationsString ? this.reservationsTransform(JSON.parse(reservationsString)): [];*/
    onValue(ref(this.database, 'reservations/'), (snapshot) => {
      this.reservaciones = [];
      this.reservacionesAux = [];
      snapshot.forEach((childSnapshot)=>{
        this.reservaciones.push(childSnapshot.val());
        this.reservacionesAux.push(childSnapshot.key);
      });
      this.crearGraficas();
    });
  }

  crearGraficas(){
    this.diaVal = {
      Lunes:0,
      Martes:0,
      Miercoles:0,
      Jueves:0,
      Viernes:0,
      Sabado:0,
    }
    this.hrsVal = {
      '8:00':0,
      '9:00':0,
      '10:00':0,
      '11:00':0,
      '12:00':0,
      '13:00':0,
      '14:00':0,
      '15:00':0,
      '16:00':0,
      '17:00':0,
      '18:00':0,
      '19:00':0,
      '20:00':0,
      '21:00':0,
      '22:00':0,
    }

    this.obtenerV();

    const ctxD = document.getElementById('barChartDay') as HTMLCanvasElement;
    const ctxH = document.getElementById('barChartHrs') as HTMLCanvasElement;

    Chart.defaults.color = '#fff';

    const barChart = new Chart(ctxD, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Numero de reservaciones por dia',
            data: this.diaVal,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(161, 158, 158, 0.849)'}
          },
          x:{grid: { color: 'rgba(161, 158, 158, 0.849)'}}
        },
      },
    });
    const barChartH = new Chart(ctxH, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Numero de reservaciones por hora',
            data: this.hrsVal,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(161, 158, 158, 0.849)'}
          },
          x:{grid: { color: 'rgba(161, 158, 158, 0.849)'}}
        },
      },
    });
  }

  obtenerV(){
    for(let r of this.reservaciones){
      switch(r.dia){
        case 'lunes': this.diaVal.Lunes++; break;
        case 'martes': this.diaVal.Martes++; break;
        case 'miercoles': this.diaVal.Miercoles++; break;
        case 'jueves': this.diaVal.Jueves++; break;
        case 'viernes': this.diaVal.Viernes++; break;
        case 'sabado': this.diaVal.Sabado++; break;
      }
      switch(r.hora){
        case 8: this.hrsVal['8:00']++; break;
        case 9: this.hrsVal['9:00']++; break;
        case 10: this.hrsVal['10:00']++; break;
        case 11: this.hrsVal['11:00']++; break;
        case 12: this.hrsVal['12:00']++; break;
        case 13: this.hrsVal['13:00']++; break;
        case 14: this.hrsVal['14:00']++; break;
        case 15: this.hrsVal['15:00']++; break;
        case 16: this.hrsVal['16:00']++; break;
        case 17: this.hrsVal['17:00']++; break;
        case 18: this.hrsVal['18:00']++; break;
        case 19: this.hrsVal['19:00']++; break;
        case 20: this.hrsVal['20:00']++; break;
        case 21: this.hrsVal['21:00']++; break;
        case 22: this.hrsVal['22:00']++; break;
      }
    }
  }
  /*async ngOnInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyBEQ1xlYvYPkh6r3aNiMDplV27dRSoV2J0",
      authDomain: "proyecto-final-9cd83.firebaseapp.com",
      projectId: "proyecto-final-9cd83",
      storageBucket: "proyecto-final-9cd83.appspot.com",
      messagingSenderId: "248208646105",
      appId: "1:248208646105:web:5758c93dfbdc9c2ca103c8"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const documentId = 'VhcuRp5M035FWDPDmVlX';
    const documentRef = doc(db, 'graficas', documentId);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();

      const labels = Object.keys(data);
      const values = Object.values(data);
      console.log(values);

      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Valores',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.log('El documento no existe');
    }
  }*/
}

interface Dias{
  Lunes:number,
  Martes:number,
  Miercoles:number,
  Jueves:number,
  Viernes:number,
  Sabado:number,
}

interface Horas{
  '8:00':number,
  '9:00':number,
  '10:00':number,
  '11:00':number,
  '12:00':number,
  '13:00':number,
  '14:00':number,
  '15:00':number,
  '16:00':number,
  '17:00':number,
  '18:00':number,
  '19:00':number,
  '20:00':number,
  '21:00':number,
  '22:00':number,
}


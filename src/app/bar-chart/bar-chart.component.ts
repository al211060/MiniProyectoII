import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore/lite';
import Chart from 'chart.js/auto';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  async ngOnInit() {
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
  }
}


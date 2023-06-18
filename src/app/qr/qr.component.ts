import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QRComponent implements OnInit {
  qrCodeData!: string;

  async ngOnInit() {
    // Configuración de Firebase
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

    const documentId = 'g0Bu18IyrB5Q3I9VUJOD';
    const documentRef = doc(db, 'QR', documentId);
    const documentSnapshot = await getDoc(documentRef);
    const data = documentSnapshot.data() as { [key: string]: any };

    const values = Object.values(data);

    this.generateRandomQRCode(values);
  }

  async handleGenerateQRCode() {
    // Generar un nuevo código QR aleatorio al hacer clic en el botón
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

    const documentId = 'g0Bu18IyrB5Q3I9VUJOD';
    const documentRef = doc(db, 'QR', documentId);
    const documentSnapshot = await getDoc(documentRef);
    const data = documentSnapshot.data() as { [key: string]: any };

    const values = Object.values(data);
    console.log(values);

    this.generateRandomQRCode(values);
  }

  generateRandomQRCode(values: any[]) {
    const randomValue = values[Math.floor(Math.random() * values.length)];

    QRCode.toDataURL(randomValue, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }

      this.qrCodeData = url;
    });
  }
}


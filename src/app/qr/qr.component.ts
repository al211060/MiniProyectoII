import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QRComponent implements OnInit {
  qrCodeData!: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRandomAnimeTitle();
  }

  /*
  getRandomAnimeTitle() {
    const apiUrl = 'https://kitsu.io/api/edge/anime';

    this.http.get<any>(apiUrl).subscribe(response => {
      const animeList = response.data;
      const randomIndex = Math.floor(Math.random() * animeList.length);
      const animeTitle = animeList[randomIndex].attributes.titles.en;

      this.generateQRCode("Un anime para ti: "+animeTitle);
    });
  }
  */

  getRandomAnimeTitle() {
    const randomIndex = Math.floor(Math.random() * 47637);
    this.http.get<any>('https://api280623-production.up.railway.app/qr/'+randomIndex, { responseType: 'text' as 'json'}).subscribe(response => {
      this.generateQRCode("Un anime para ti: "+response);
    });
  }

  generateQRCode(data: string) {
    QRCode.toDataURL(data, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }

      this.qrCodeData = url;
    });
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  quote1:any;
  quote2:any;
  quote3:any;

  constructor(private http: HttpClient){
    /*this.getQuote().subscribe(
      (result:any) => {
        this.quote1 = result.quote;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
      }
    ); 
    this.getQuote().subscribe(
      (result:any) => {
        this.quote2 = result.quote;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
      }
    );
    this.getQuote().subscribe(
      (result:any) => {
        this.quote3 = result.quote;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
      }
    );
    console.log(this.quote1+" "+this.quote2+" "+this.quote3);*/
  }

  getQuote(){
    return this.http.get('https://animechan.vercel.app/api/random');
  }

}

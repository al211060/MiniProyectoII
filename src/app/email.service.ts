import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public apiUrl = 'https://emailapi-production-abac.up.railway.app/formulario';
  //const API_URL = 'http://localhost:3000/formulario';

  constructor(private http: HttpClient) { }

  sendMessage(body: any) {
    return this.http.post(this.apiUrl, body);
  }

}

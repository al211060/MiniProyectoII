import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product{
  id: number;
  nombre: string;
  precioEspecial: number;
  precioSugerido: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'https://api280623-production.up.railway.app/products'; //Link de la API
  //               'https://api280623-production.up.railway.app/products'

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    //const url = `${this.apiUrl}/products`;
    return this.http.get<any>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  getProductsBySuggestedPrice(minPrice: number): Observable<Product[]> {
    const url = `${this.apiUrl}/suggestedPrice/${minPrice}`;
    return this.http.get<Product[]>(url);
  }

  /*createProduct(): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, {
      name: 'Nuevo Producto',
      providerPrice: 0,
      suggestedPrice: 0
    });
  }*/

  createProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, newProduct);
  }
  


}

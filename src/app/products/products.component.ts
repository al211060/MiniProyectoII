import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth-service.service';


interface Product {
  id: number;
  nombre: string;
  precioEspecial: number;
  precioSugerido: number;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})



export class ProductsComponent implements OnInit, AfterViewChecked {
  
  products: Product[] = [];
  productId: number = 0;
  minPrice: number = 0;

  nombreProducto: string = '';
  precioEspecialProducto: number = 0;
  precioSugeridoProducto: number = 0;

  newProduct: Product = {
    id: 0,
    nombre: '',
    precioEspecial: 0,
    precioSugerido: 0
  };
  
  constructor(private productosService: ProductosService, private http: HttpClient, public authService: AuthService, private router: Router){
      if(!authService.isLoggedIn()){
        this.router.navigate(['/']);
      } 
    }

    ngAfterViewChecked(){
      if(!this.authService.isLoggedIn()){
        this.router.navigate(['/']);
      }
    }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void{
    this.productosService.getAllProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  getProductById(id: number): void {
    this.productosService.getProductById(id)
      .subscribe(product => {
        this.products = [product]; // Asignar el producto encontrado al arreglo products
      });
  }

  getProductsBySuggestedPrice(minPrice: number): void {
    this.productosService.getProductsBySuggestedPrice(minPrice)
      .subscribe(products => {
        this.products = products;
      });
  }

  /*
  createProduct(): void {
    const newProduct: Product = {
      id: 0,
      nombre: this.nombreProducto,
      precioEspecial: this.precioEspecialProducto,
      precioSugerido: this.precioSugeridoProducto
    };
  
    this.productosService.createProduct(newProduct)
      .subscribe(() => {
        // Actualizar la lista de productos después de la creación
        this.fetchProducts();
      });
  
    // Restablecer los valores del formulario
    this.nombreProducto = '';
    this.precioEspecialProducto = 0;
    this.precioSugeridoProducto = 0;
  }
  */

  createProduct(): void {
    this.productosService.createProduct(this.newProduct).subscribe(() => {
      // Actualizar la lista de productos después de la creación
      this.fetchProducts();
    });
  }

}

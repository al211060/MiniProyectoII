import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


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



export class ProductsComponent implements OnInit {
  
  products: Product[] = [];
  productId: number = 0;
  minPrice: number = 0;
  
  constructor(private productosService: ProductosService,
    private router: Router) { }

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
        // Redireccionar al componente de detalles del producto
        this.router.navigate(['/product', product.id]);
      });
  }

  getProductsBySuggestedPrice(minPrice: number): void {
    this.productosService.getProductsBySuggestedPrice(minPrice)
      .subscribe(products => {
        this.products = products;
      });
  }

  createProduct(): void {
    const newProduct: Product = {
      id: 0,
      nombre: 'Nuevo Producto',
      precioEspecial: 0,
      precioSugerido: 0
    };

    this.productosService.createProduct(newProduct)
      .subscribe(() => {
        // Actualizar la lista de productos después de la creación
        this.fetchProducts();
      });
    }

}

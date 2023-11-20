import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: any[];
  constructor(private service: ProductService) { 
    this.products = [];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getAllProducts().subscribe(
      {
        next:(res) => this.products = res,
        error:(err) => console.log(err.message),
        
      }
    )
  }

}

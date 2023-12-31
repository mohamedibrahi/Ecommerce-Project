import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: Product[];
  categories: string[];
  loading: boolean = false;
  cartProduct: any[] = [];
  constructor(private service: ProductService, private toasrtService: ToastrService) {
    this.products = [];
    this.categories = [];
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      {
        next: (res) => {
          this.products = res;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.toasrtService.error(err.message, '', {
            disableTimeOut: false,
            titleClass: "toastr_title",
            messageClass: "toastr_message",
            timeOut: 5000,
            closeButton: true,
          })
        },

      }
    )
  }

  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe(
      {
        next: (res: any) => {
          this.categories = res;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.toasrtService.error(err.message, '', {
            disableTimeOut: false,
            titleClass: "toastr_title",
            messageClass: "toastr_message",
            timeOut: 5000,
            closeButton: true,
          })
        },
      }
    )
  }

  filterCategory(event: any) {
    let value = event.target.value;
    (value == "all") ? this.getProducts() : this.getProductsCategory(value);

  }
  getProductsCategory(keyword: string) {
    this.loading = true;
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.loading = false;
      this.products = res
    })
  }

  addToCart(event: any) {
    //JSON.stringify() // Send date
    //JSON.parse() // Recieved data
    if("cart" in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProduct.find(item => item.item.id == event.item.id);
      if(exist) {
        this.toasrtService.error("Product is already exist", '', {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        })
      }else {
        this.cartProduct.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProduct));
      }
    } else {
      this.cartProduct.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    }

  }
}

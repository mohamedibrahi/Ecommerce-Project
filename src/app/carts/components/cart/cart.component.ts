import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  totalCartProducts: any = 0;
  success: boolean = false;
  constructor(private service :CartService) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getTotalPrice();
  }


  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  minsAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  detectChange() {
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  clearCart(){
    this.cartProducts = [];
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  getTotalPrice() {
    this.totalCartProducts = 0;
    for (let x in this.cartProducts) {
      this.totalCartProducts += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {
    let products = this.cartProducts.map(item => {
     return {productId: item.item.id , quantity: item.quantity}
    })
    let model = {
      userId :4,
      date: new Date(),
      products:products
    }
    this.service.createNewCart(model).subscribe(data => {
      this.success =true
    })
    
  }

}

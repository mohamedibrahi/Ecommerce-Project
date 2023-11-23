import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id:any;
  data:any ={};
  loading:boolean = false;
  constructor(private route:ActivatedRoute , private service : ProductService ,private toasrtService:ToastrService) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    this.loading  = true;
    this.service.getProductById(this.id).subscribe(
      {
        next: (res: any) => {
          this.data = res;
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
}

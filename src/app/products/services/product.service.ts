import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() :Observable<any> {
    return this.http.get(environment.baseUrl + 'products');
  }

  getAllCategories(){
    return this.http.get(environment.baseUrl + 'products/categories');
  }

  getProductsByCategory(keyword: string){
    return this.http.get(environment.baseUrl + 'products/category/'+keyword);
  }
}

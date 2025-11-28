import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../core/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = 'http://127.0.0.1:8000/api/v1/products/';

  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  loadAll() {
    this.http.get<Product[]>(this.BASE_URL).subscribe(data => {
      this.products.set(data);
    });
  }

  create(pro: any) {
    return this.http.post<Product>(this.BASE_URL, pro);
  }

  update(id: number, pro: any) {
    return this.http.put<Product>(`${this.BASE_URL}${id}/`, pro);
  }

  delete(id: number) {
    return this.http.delete(`${this.BASE_URL}${id}/`);
  }
}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../core/models/models';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api/v1/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  loadAll() {
    this.http.get<Product[]>(API_URL).subscribe(this.products.set);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}${id}/`);
  }

  create(data: Product): Observable<Product> {
    return this.http.post<Product>(API_URL, data);
  }

  update(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${API_URL}${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}${id}/`);
  }
}

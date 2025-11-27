import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../../core/models/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private BASE_URL = 'http://127.0.0.1:8000/api/v1/suppliers/';

  suppliers = signal<Supplier[]>([]);

  constructor(private http: HttpClient) {}

  loadAll() {
    this.http.get<Supplier[]>(this.BASE_URL).subscribe(data => {
      this.suppliers.set(data);
    });
  }

  create(sup: any) {
    return this.http.post<Supplier>(this.BASE_URL, sup);
  }

  update(id: number, sup: any) {
    return this.http.put<Supplier>(`${this.BASE_URL}${id}/`, sup);
  }

  delete(id: number) {
    return this.http.delete(`${this.BASE_URL}${id}/`);
  }
}

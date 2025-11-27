import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../core/models/models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private BASE_URL = 'http://127.0.0.1:8000/api/v1/customers/';

  customers = signal<Customer[]>([]);

  constructor(private http: HttpClient) {}

  loadAll() {
    this.http.get<Customer[]>(this.BASE_URL).subscribe(data => {
      this.customers.set(data);
    });
  }

  create(emp: any) {
    return this.http.post<Customer>(this.BASE_URL, emp);
  }

  update(id: number, emp: any) {
    return this.http.put<Customer>(`${this.BASE_URL}${id}/`, emp);
  }

  delete(id: number) {
    return this.http.delete(`${this.BASE_URL}${id}/`);
  }
}

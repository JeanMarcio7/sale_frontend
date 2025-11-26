import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../core/models/models';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api/v1/customers/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers = signal<Customer[]>([]);

  constructor(private http: HttpClient) {}

  loadAll() {
    this.http.get<Customer[]>(API_URL).subscribe(this.customers.set);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}${id}/`);
  }

  create(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL, data);
  }

  update(id: number, data: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}${id}/`);
  }
}

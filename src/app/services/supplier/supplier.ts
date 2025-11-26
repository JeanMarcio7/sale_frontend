import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../../core/models/models';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api/v1/suppliers/';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliers = signal<Supplier[]>([]);

  constructor(private http: HttpClient) {}

  loadAll() {
    this.http.get<Supplier[]>(API_URL).subscribe(this.suppliers.set);
  }

  getById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${API_URL}${id}/`);
  }

  create(data: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(API_URL, data);
  }

  update(id: number, data: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${API_URL}${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}${id}/`);
  }
}

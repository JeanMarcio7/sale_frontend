import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../core/models/models';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private BASE_URL = 'http://127.0.0.1:8000/api/v1/employees/';

  employees = signal<Employee[]>([]);

  constructor(private http: HttpClient) {}

  loadAll() {
    this.http.get<Employee[]>(this.BASE_URL).subscribe(data => {
      this.employees.set(data);
    });
  }

  create(emp: any) {
    return this.http.post<Employee>(this.BASE_URL, emp);
  }

  update(id: number, emp: any) {
    return this.http.put<Employee>(`${this.BASE_URL}${id}/`, emp);
  }

  delete(id: number) {
    return this.http.delete(`${this.BASE_URL}${id}/`);
  }
}

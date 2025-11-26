import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../core/models/models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BASE_URL = 'http://127.0.0.1:8000/api/v1/employees/';

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadAll() {
    this.http.get<Employee[]>(this.BASE_URL).subscribe(data => {
      this.employeesSubject.next(data);
    });
  }

  create(emp: any): Observable<Employee> {
    return this.http.post<Employee>(this.BASE_URL, emp);
  }

  update(id: number, emp: any): Observable<Employee> {
    return this.http.patch<Employee>(`${this.BASE_URL}${id}/`, emp);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}${id}/`);
  }

  employees() {
    return this.employeesSubject.value;
  }
}

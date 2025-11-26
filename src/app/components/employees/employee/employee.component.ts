import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeService } from '../../../services/employee/employee';
import { Employee } from '../../../core/models/models';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})

export class EmployeeComponent implements OnInit {

  form!: FormGroup;
  selectedId: number | null = null;

  constructor(
    private fb: FormBuilder,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      salary: [''],
      admission_date: [''],
      birth_date: [''],
      gender: [''],

      department: [''],
      district: [''],
      marital_status: ['']
    });

    this.employeeService.loadAll();
  }

  selectForEdit(emp: Employee) {
    this.selectedId = emp.id ?? null;

    this.form.patchValue({
      name: emp.name,
      salary: emp.salary,
      admission_date: emp.admission_date,
      birth_date: emp.birth_date,
      gender: emp.gender,
      department: emp.department,
      district: emp.district,
      marital_status: emp.marital_status
    });
  }

  save() {
    const payload = this.form.value;

    if (this.selectedId) {
      this.employeeService.update(this.selectedId, payload).subscribe({
        next: () => this.clearAndReload(),
        error: (e) => console.error("Erro ao atualizar:", e)
      });
    } else {
      this.employeeService.create(payload).subscribe({
        next: () => this.clearAndReload(),
        error: (e) => console.error("Erro ao criar:", e)
      });
    }
  }

  delete(emp: Employee) {
    if (!emp.id) return;

    this.employeeService.delete(emp.id).subscribe(() => {
      this.employeeService.loadAll();
    });
  }

  clearAndReload() {
    this.selectedId = null;
    this.form.reset();
    this.employeeService.loadAll();
  }
}

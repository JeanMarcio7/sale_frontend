import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer/customer';
import { Customer } from '../../../core/models/models';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ],
  templateUrl: './customer.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  form!: FormGroup;

  selectedId = signal<number | null>(null);

  constructor(
    private fb: FormBuilder,
    public customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      income: [''],
      gender: [''],
      district: [''],
      marital_status: [''],
    });

    this.customerService.loadAll();
  }

  selectForEdit(cust: Customer) {
    this.selectedId.set(cust.id ?? null);

    this.form.patchValue({
      name: cust.name,
      income: cust.income,
      gender: cust.gender,
      district: cust.district,
      marital_status: cust.marital_status
    });
  }

  save() {
    const payload = this.form.value;

    if (this.selectedId()) {
      this.customerService.update(this.selectedId()!, payload).subscribe({
        next: () => this.clearAndReload(),
        error: (c) => console.error("Erro ao atualizar:", c)
      });

    } else {
      this.customerService.create(payload).subscribe({
        next: () => this.clearAndReload(),
        error: (c) => console.error("Erro ao criar:", c)
      });
    }
  }

  delete(cust: Customer) {
    if (!cust.id) return;

    this.customerService.delete(cust.id).subscribe(() => {
      this.customerService.loadAll();
    });
  }

  clearAndReload() {
    this.selectedId.set(null);
    this.form.reset();
    this.customerService.loadAll();
  }
}

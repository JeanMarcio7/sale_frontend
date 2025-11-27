import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SupplierService } from '../../../services/supplier/supplier';
import { Supplier } from '../../../core/models/models';

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
  templateUrl: './supplier.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  form!: FormGroup;

  selectedId = signal<number | null>(null);

  constructor(
    private fb: FormBuilder,
    public supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      legal_document: [''],
    });

    this.supplierService.loadAll();
  }

  selectForEdit(sup: Supplier) {
    this.selectedId.set(sup.id ?? null);

    this.form.patchValue({
      name: sup.name,
      legal_document: sup.legal_document,
    });
  }

  save() {
    const payload = this.form.value;

    if (this.selectedId()) {
      this.supplierService.update(this.selectedId()!, payload).subscribe({
        next: () => this.clearAndReload(),
        error: (s) => console.error("Erro ao atualizar:", s)
      });

    } else {
      this.supplierService.create(payload).subscribe({
        next: () => this.clearAndReload(),
        error: (s) => console.error("Erro ao criar:", s)
      });
    }
  }

  delete(sup: Supplier) {
    if (!sup.id) return;

    this.supplierService.delete(sup.id).subscribe(() => {
      this.supplierService.loadAll();
    });
  }

  clearAndReload() {
    this.selectedId.set(null);
    this.form.reset();
    this.supplierService.loadAll();
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product';
import { Product } from '../../../core/models/models';

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
  templateUrl: './product.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  form!: FormGroup;

  selectedId = signal<number | null>(null);

  constructor(
    private fb: FormBuilder,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      cost_price: [''],
      sale_price: [''],
      product_group: [''],
      supplier: [''],

    });

    this.productService.loadAll();
  }

  selectForEdit(pro: Product) {
    this.selectedId.set(pro.id ?? null);

    this.form.patchValue({
      name: pro.name,
      cost_price: pro.cost_price,
      sale_price: pro.sale_price,
      product_group: pro.product_group,
      supplier: pro.supplier,
    });
  }

  save() {
    const payload = this.form.value;

    if (this.selectedId()) {
      this.productService.update(this.selectedId()!, payload).subscribe({
        next: () => this.clearAndReload(),
        error: (e) => console.error("Erro ao atualizar:", e)
      });

    } else {
      this.productService.create(payload).subscribe({
        next: () => this.clearAndReload(),
        error: (e) => console.error("Erro ao criar:", e)
      });
    }
  }

  delete(pro: Product) {
    if (!pro.id) return;

    this.productService.delete(pro.id).subscribe(() => {
      this.productService.loadAll();
    });
  }

  clearAndReload() {
    this.selectedId.set(null);
    this.form.reset();
    this.productService.loadAll();
  }
}

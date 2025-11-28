import { Routes } from '@angular/router';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { SupplierComponent } from './components/suppliers/supplier/supplier.component';
import { ProductComponent } from './components/products/product/product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'suppliers', component: SupplierComponent },
  { path: 'products', component: ProductComponent },
  { path: '**', redirectTo: 'customers' },
];

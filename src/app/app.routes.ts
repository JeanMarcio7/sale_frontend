import { Routes } from '@angular/router';
//import { CustomerCrudComponent } from './features/customers/customer-crud.';
import { EmployeeComponent } from './components/employees/employee/employee.component';
//import { SupplierCrudComponent } from './features/suppliers/supplier-crud.component';
//import { ProductCrudComponent } from './features/products/product-crud.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  //{ path: 'customers', component: CustomerCrudComponent },
  { path: 'employees', component: EmployeeComponent },
  //{ path: 'suppliers', component: SupplierCrudComponent },
  //{ path: 'products', component: ProductCrudComponent },
  { path: '**', redirectTo: 'customers' },
];

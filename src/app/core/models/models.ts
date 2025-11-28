export interface ModelBase {
  id?: number;
  created_a?: string;
  modified_at?: string;
  active?: boolean;
}
export enum Gender {
  M = 'M',
  F = 'F'
}

export interface Customer extends ModelBase {
  name: string;
  income: number;
  gender: 'M' | 'F';
  district: number;
  marital_status: number;
}

export interface Supplier extends ModelBase {
  name: string;
  legal_document: string;
}

export interface Product extends ModelBase {
  name: string;
  cost_price: number;
  sale_price: number;
  product_group: number;
  supplier: number;
}


export interface Employee extends ModelBase {
  name: string;
  salary: number;
  admission_date: string;
  birth_date: string;
  gender: 'M' | 'F';

  department: number;
  district: number;
  marital_status: number;
}

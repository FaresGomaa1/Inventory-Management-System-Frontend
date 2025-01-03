import { Component, OnInit } from '@angular/core';
import { GetSupplierDTO } from 'src/interfaces/isupplier';
import { SupplierService } from 'src/services/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
})
export class SuppliersComponent implements OnInit {
  suppliers: GetSupplierDTO[] = [];
  searchTerm: string = '';

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });
  }

  filteredSuppliers(): GetSupplierDTO[] {
    return this.suppliers.filter(
      (supplier) =>
        supplier.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        supplier.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        supplier.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

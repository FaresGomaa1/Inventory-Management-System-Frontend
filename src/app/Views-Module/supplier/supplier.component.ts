import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetSupplierDTO } from 'src/interfaces/isupplier';
import { SupplierService } from 'src/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  supplier:GetSupplierDTO= {} as GetSupplierDTO
  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){

    }
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.supplierService.getSupplierById(+id).subscribe(
        (supplier) => {
          this.supplier = supplier;
        },
        (error) => {
          console.error('Error fetching supplier:', error);
        }
      );
    } else {
      console.error('No id provided in the route');
    }
  }
}

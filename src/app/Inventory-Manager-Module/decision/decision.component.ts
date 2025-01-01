import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryDTO } from 'src/interfaces/icategory';
import { GetRequests } from 'src/interfaces/IRequest';
import { GetSupplierDTO } from 'src/interfaces/isupplier';
import { AuthService } from 'src/services/auth.service';
import { CategoryService } from 'src/services/category.service';
import { RequestService } from 'src/services/request.service';
import { SupplierService } from 'src/services/supplier.service';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss'],
})
export class DecisionComponent {
  errorMessage: string[] = [];
  request:GetRequests = {} as GetRequests;
  categories: GetCategoryDTO[] = [];
  supplier: GetSupplierDTO = {} as GetSupplierDTO
  userId:string = "";
  currentDate: string = ""
  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.fetchRequest()
  }
  fetchRequest(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!id || isNaN(id)) {
      console.warn('ID is required to fetch the product.');
      return;
    }

    this.requestService.getRequestById(id).subscribe({
      next: (request) => {
        if (request) {
          this.request = request;
          const now = new Date(request.createdOn);
          this.currentDate = now.toISOString().slice(0, 16);
          this.fetchCategories();
          this.fetchSupplier()
        } else {
          console.warn('Product not found.');
        }
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      },
    });
  }
  fetchCategories(){
    this.categoryService.getCategories().subscribe((categories)=>{
      this.categories = categories
    })
  }
  fetchSupplier(){
    if(!this.request.supplierId){
      return;
    }
    this.supplierService.getSupplierById(this.request.supplierId).subscribe((supplier)=>{
      this.supplier=supplier;
    })
  }
  category(): string {
    const category = this.categories.find(c => c.id === this.request.categoryId);
    return category ? category.name : 'Category not found'; // Return a default message if not found
  }  
}

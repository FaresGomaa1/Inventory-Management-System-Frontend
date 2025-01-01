import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryDTO } from 'src/interfaces/icategory';
import { GetRequests, UpdateRequest } from 'src/interfaces/IRequest';
import { GetSupplierDTO } from 'src/interfaces/isupplier';
import { AuthService } from 'src/services/auth.service';
import { CategoryService } from 'src/services/category.service';
import { RequestService } from 'src/services/request.service';
import { SupplierService } from 'src/services/supplier.service';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.scss']
})
export class UpdateRequestComponent {
  errorMessage: string[] = [];
  updatedRequest: UpdateRequest = {} as UpdateRequest;
  request:GetRequests = {} as GetRequests;
  categories: GetCategoryDTO[] = [];
  supplier: GetSupplierDTO = {} as GetSupplierDTO
  currentDate:string = "";
  userId:string = "";

  constructor(
    private requestService:RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService:CategoryService,
    private supplierService:SupplierService,
    private authService: AuthService
  ){
    this.userId = this.authService.getToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  
  }
  ngOnInit(): void {
    this.fetchRequest();
  }
  handleSubmit() {
    if (!this.updatedRequest) {
      console.error('Updated request data is missing');
      return;
    }
  
    this.requestService.updateRequest(this.updatedRequest).subscribe({
      next: (response) => {
        this.router.navigate(['/views']);
      },
      error: (error) => {
        console.log('Error updating request:', error.message);
        // Handle error logic, such as showing an error message
        alert(`Failed to update the request: ${error.message}`);
      }
    });
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
          this.updatedRequest = {
            requestId: request.id,
            requestType: request.requestType,
            name: request.name,
            price: request.price,
            sku: request.sku,
            quantity: request.quantity,
            description: request.description,
            categoryId:request.categoryId,
            supplierId: request.supplierId,
            userId: request.userId,
            requestStatus : "Updated"
          };
          console.log("awdawdwadwadwa",this.request)
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
  isNotAddRequest(): boolean {
    return (
      this.updatedRequest.requestType === 'Update Request' ||
      this.updatedRequest.requestType === 'Delete Request'
    );
  }
  fetchCategories(){
    this.categoryService.getCategories().subscribe((categories)=>{
      this.categories = categories
    })
  }
  fetchSupplier(){
    if(!this.updatedRequest.supplierId){
      return;
    }
    this.supplierService.getSupplierById(this.updatedRequest.supplierId).subscribe((supplier)=>{
      this.supplier=supplier;
    })
  }
}

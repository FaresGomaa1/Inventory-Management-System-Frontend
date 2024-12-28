import { Component } from '@angular/core';
import { GetCategoryDTO } from 'src/interfaces/icategory';
import { GetProductDTO } from 'src/interfaces/IProduct';
import { AddRequest } from 'src/interfaces/IRequest';
import { GetSupplierDTO } from 'src/interfaces/isupplier';
import { AuthService } from 'src/services/auth.service';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { SupplierService } from 'src/services/supplier.service';
import { Request } from '../../../classes/request';
import { RequestService } from 'src/services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})
export class CreateRequestComponent {
  categories: GetCategoryDTO[] = [];
  suppliers: GetSupplierDTO[] = [];
  products: GetProductDTO[] = [];
  request: AddRequest = new Request();
  currentDate: any;
  errorMessage: string[]=[];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private authService: AuthService,
    private requestService:RequestService,
    private router: Router
  ) {
    const now = new Date();
    this.currentDate = now.toISOString().slice(0, 16);
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.supplierService.getSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });
  }

  handleSubmit(): void {
    this.errorMessage = [];
  
    if (!this.request.requestType) {
      this.errorMessage.push("You need to choose a request type");
      return;
    }
  
    const validateFields = () => {
      if (!this.request.categoryId) {
        this.errorMessage.push("Select a category. If the required category does not exist, add it first, then create the request.");
      }
      if (!this.request.supplierId) {
        this.errorMessage.push("Select a supplier. If the required supplier does not exist, add it first, then create the request.");
      }
      if (!this.request.name || this.request.name.trim().length < 3) {
        this.errorMessage.push("You need to insert a product name with at least 3 characters.");
      }
      if (this.request.price == null || this.request.price <= 0) {
        this.errorMessage.push("You need to insert a price greater than 0.");
      }
      if (
        this.request.quantity == null ||
        this.request.quantity <= 0 ||
        !Number.isInteger(this.request.quantity)
      ) {
        this.errorMessage.push("You need to insert a quantity greater than 0 and as an integer.");
      }
    };
  
    switch (this.request.requestType) {
      case "Add Request":
      case "Update Request":
        validateFields();
        this.handleUpdateAddRequest()
        break
      case "Delete Request":
        validateFields();
        this.handleDeleteRequest()
        break;
      default:
        this.errorMessage.push("Invalid request type.");
        break;
    }
  }  
  fetchProducts() {
    if (this.isNotAddRequest()) {
      this.loadProducts();
    }
  }
  fetchProduct(): void {
    if (!this.request.sku) {
      console.warn('Product ID is required to fetch the product.');
      return;
    }
    this.productService.getProduct(this.request.sku).subscribe({
      next: (product) => {
        if (product) {
          this.request.categoryId = product.categoryId ?? '';
          this.request.supplierId = product.supplierId ?? null;
          this.request.name = product.name ?? '';
          this.request.price = product.price ?? null;
          this.request.sku = product.sku ?? '';
          this.request.quantity = product.quantity ?? null;
          this.request.description = product.description;
        } else {
          console.warn('No product found for the given ID.');
        }
      },
      error: (err) => {
        console.error('Error fetching product data:', err);
      },
    });
  }
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      },
    });
  }
  isNotAddRequest(): boolean {
    return (
      this.request.requestType === 'Update Request' ||
      this.request.requestType === 'Delete Request'
    );
  }
  generateSKU(): void {
    if (!this.request.categoryId || !this.request.requestType || this.request.requestType === "Update Request") {
      console.warn('Category ID or Request Type is missing');
      return;
    }
    const category = this.categories.find(cat => cat.id == this.request.categoryId);
    if (!category) {
      console.error('Category not found');
      return;
    }
  
    if (category.name.length < 2) {
      console.error('Category name is too short to generate SKU');
      return;
    }
  
    const subString = `${category.name.slice(0, 2).toUpperCase()}-0`;
  
    this.requestService.generateSKU(subString, this.request.requestType)
      .subscribe({
        next: (response) => {
          console.log('SKU generated successfully:', response);
          this.request.sku = response.message;
        },
        error: (err) => {
          console.error('Error generating SKU:', err);
        }
      });
  }
  handleUpdateAddRequest() {
    this.errorMessage = [];
    this.requestService.createRequest(this.request).subscribe({
      next: (response) => {
        this.router.navigate(['/views']);
      },
      error: (error) => {
        this.errorMessage.push(error);
      }
    });
  }

  handleDeleteRequest() {
    this.errorMessage = [];
    if(!this.request.sku){
      this.errorMessage.push("SKU is not provided")
      return
    }
    const userId = this.authService.getToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.requestService.deleteRequest(this.request.sku, userId).subscribe({
      next: (response) => {
        this.router.navigate(['/views']);
      },
      error: (error) => {
       this.errorMessage.push(error);
      }
    });
  }
}

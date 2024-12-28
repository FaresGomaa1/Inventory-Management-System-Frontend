// Define the base class that includes shared properties for all product DTOs
export interface BaseClass {
    name: string;
    price: number;
    sku: string;
    quantity: number;
    description: string;
    created_On: Date;
  }
  
  // Interface for GetProductDTO
  export interface GetProductDTO extends BaseClass {
    id: number;
    categoryName: string;
    categoryId: number;
    supplierFullName: string;
    supplierId: number;
  }
  
  // Interface for AddProductDTO
  export interface AddProductDTO extends BaseClass {
    categoryId: number;
    supplierId: number;
  }
  
  // Interface for UpdateProductDTO (inherits from AddProductDTO and includes an ID)
  export interface UpdateProductDTO extends AddProductDTO {
    id: number;
  }
  
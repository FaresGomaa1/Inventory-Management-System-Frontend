import { AddRequest } from "src/interfaces/IRequest";

export class Request implements AddRequest {
    requestType?: string;
    name?: string;
    price?: number;
    sku?: string;
    quantity?: number;
    description?: string;
    categoryId?: number;
    supplierId?: number;
    userId?: string;
  
    constructor(
      requestType?: string,
      name?: string,
      price?: number,
      sku?: string,
      quantity?: number,
      description?: string,
      categoryId?: number,
      supplierId?: number,
      userId?: string
    ) {
      this.requestType = requestType;
      this.name = name;
      this.price = price;
      this.sku = sku;
      this.quantity = quantity;
      this.description = description;
      this.categoryId = categoryId;
      this.supplierId = supplierId;
      this.userId = userId;
    }
  }
  
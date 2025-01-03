import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductDTO } from 'src/interfaces/IProduct';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: GetProductDTO = {} as GetProductDTO;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    const sku = this.route.snapshot.paramMap.get('sku');
    if (sku) {
      this.productService.getProduct(sku).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    } else {
      console.error('No SKU provided in the route');
    }
  }
}

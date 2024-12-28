import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetProductDTO, AddProductDTO, UpdateProductDTO } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<GetProductDTO[]> {
    return this.http.get<GetProductDTO[]>(this.apiUrl);
  }

  getProduct(sku: string): Observable<GetProductDTO> {
    return this.http.get<GetProductDTO>(`${this.apiUrl}/${sku}`);
  }

  addProduct(addProductDTO: AddProductDTO): Observable<any> {
    return this.http.post(this.apiUrl, addProductDTO);
  }

  updateProduct(updateProductDTO: UpdateProductDTO): Observable<any> {
    return this.http.put(this.apiUrl, updateProductDTO);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

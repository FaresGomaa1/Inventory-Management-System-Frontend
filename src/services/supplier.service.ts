import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetSupplierDTO, AddSupplierDTO } from '../interfaces/isupplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = `${environment.apiUrl}/Supplier`;

  constructor(private http: HttpClient) { }

  // Get all suppliers
  getSuppliers(): Observable<GetSupplierDTO[]> {
    return this.http.get<GetSupplierDTO[]>(this.apiUrl);
  }

  // Get supplier by ID
  getSupplierById(id: number): Observable<GetSupplierDTO> {
    return this.http.get<GetSupplierDTO>(`${this.apiUrl}/${id}`);
  }

  // Add a new supplier
  addSupplier(supplierDto: AddSupplierDTO): Observable<any> {
    return this.http.post(this.apiUrl, supplierDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
}

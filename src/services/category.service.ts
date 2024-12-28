import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Make sure to configure the environment file
import { GetCategoryDTO } from '../interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.apiUrl}/Category`;

  constructor(private http: HttpClient) { }

  // Get categories
  getCategories(): Observable<GetCategoryDTO[]> {
    return this.http.get<GetCategoryDTO[]>(this.apiUrl);
  }

  addCategory(categoryName: string): Observable<any> {
    return this.http.post(this.apiUrl, categoryName, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

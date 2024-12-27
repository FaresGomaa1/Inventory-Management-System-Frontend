import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {GetRequestsResponse } from 'src/interfaces/IRequest';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = `${environment.apiUrl}/request`;
  constructor(private http: HttpClient) {}

  getRequests(
    viewName: string,
    sortBy: string,
    userId: string,
    isAscending: boolean
  ): Observable<GetRequestsResponse> {
    const params = new HttpParams()
      .set('viewName', viewName)
      .set('sortBy', sortBy)
      .set('userId', userId)
      .set('isAscending', isAscending.toString());

    return this.http
      .get<GetRequestsResponse>(`${this.apiUrl}/GetRequests`, { params })
      .pipe(
        catchError((error) => {
          console.error('Error fetching requests:', error);
          return throwError(() => new Error('Error fetching requests'));
        })
      );
  }
}

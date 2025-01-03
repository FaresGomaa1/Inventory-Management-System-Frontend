import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {AddRequest, GetRequests, GetRequestsResponse, IAssign, IUserRequestInfo, UpdateRequest } from 'src/interfaces/IRequest';

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
  generateSKU(
    sku: string,
    requestType: string
  ): Observable<{ message: string }> {
    if (!sku || !requestType) {
      throw new Error('SKU and Request Type are required');
    }

    const params = new HttpParams()
      .set('sku', sku)
      .set('requestType', requestType);

    return this.http
      .get<{ message: string }>(`${this.apiUrl}/GenerateSKU`, { params })
      .pipe(
        catchError((error) => {
          console.error('Error generating SKU:', error);
          return throwError(() => new Error('Error generating SKU'));
        })
      );
  }
  createRequest(requestDetails: AddRequest): Observable<{ message: string }> {
    if (!requestDetails) {
      throw new Error('Request details are required');
    }
    console.log(requestDetails);
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/CreateRequest`, requestDetails)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }
  deleteRequest(SKU: string, userId: string): Observable<{ message: string }> {
    if (!SKU) {
      throw new Error('SKU is required');
    }
    if (!userId) {
      throw new Error('User ID is required');
    }

    const params = new HttpParams().set('SKU', SKU).set('userId', userId);

    return this.http
      .post<{ message: string }>(`${this.apiUrl}/DeleteRequest`, null, {
        params,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }
  getRequestById(id: number): Observable<GetRequests> {
    return this.http.get<GetRequests>(`${this.apiUrl}/GetById?id=${id}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.error('Request not found:', error.message);
        } else if (error.status === 500) {
          console.error('Server error:', error.message);
        }
        return throwError(
          () => new Error(error.error.message || 'Error fetching request')
        );
      })
    );
  }
  updateRequest(
    updateRequest: UpdateRequest
  ): Observable<{ message: string; requestId: number }> {
    if (!updateRequest) {
      throw new Error('Update request details are required');
    }

    return this.http
      .put<{ message: string; requestId: number }>(
        `${this.apiUrl}/UpdateRequest`,
        updateRequest
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating request:', error);
          return throwError(
            () => new Error(error.error.message || 'Error updating request')
          );
        })
      );
  }
  updateManagerDecision(managerDecision: {
    managerId: string;
    requestId: number;
    decision: string;
    comment: string;
    managerType: string;
  }): Observable<{
    message: string;
    requestId: number;
    decision: string;
    comment: string;
  }> {
    // Validate the input object
    if (!managerDecision || !managerDecision.requestId || !managerDecision.decision) {
      throw new Error('Manager decision details are required and must include a valid requestId and decision.');
    }
  
    // Perform the HTTP PATCH request
    return this.http
      .patch<{
        message: string;
        requestId: number;
        decision: string;
        comment: string;
      }>(`${this.apiUrl}/update-manager-decision`, managerDecision)
      .pipe(
        catchError((error) => {
          console.error('Error updating manager decision:', error);
          return throwError(() => new Error(
            error?.error?.message || 'An unexpected error occurred while updating the manager decision.'
          ));
        })
      );
  }
  assignRequest(assign:IAssign): Observable<{ message: string }> {
    if (!assign.userId || !assign.managerId || !assign.requestId) {
      throw new Error('User ID, Manager ID, and Request ID are required');
    }

    return this.http
      .patch<{ message: string }>(`${this.apiUrl}/Assign`, assign)
      .pipe(
        catchError((error) => {
          console.error('Error assigning request:', error);
          return throwError(() => new Error(error.error.message || 'Error assigning request'));
        })
      );
  }
  getActiveRequestsForTeam(managerId: string): Observable< { result: IUserRequestInfo[] }> {
    if (!managerId) {
      throw new Error('Manager ID is required');
    }
    return this.http
      .get< { result: IUserRequestInfo[] }>(`${this.apiUrl}/team/${managerId}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching active requests for team:', error);
          return throwError(() => new Error(error.error.message || 'Error fetching active requests for team'));
        })
      );
  }
  
}

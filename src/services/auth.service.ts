import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IManager, IUser } from 'src/interfaces/iuser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtPayload } from 'src/interfaces/IJWT';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/user`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  signUp(newUser:IUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, newUser);
  }

  signIn(email:string ,userName: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email,userName, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/signin']);
  }

  getToken(): JwtPayload {
   let token:string =  localStorage.getItem('token') ?? "";
    const helper = new JwtHelperService(token);
    const isExpired = helper.isTokenExpired(token);
    if(isExpired){
     return {} as JwtPayload
    }
    const decodedToken = helper.decodeToken(token);
    return decodedToken;

  }
  isTokenExpired(): boolean{
    let token:string =  localStorage.getItem('token') ?? "";
    if(!token || token === ""){
      return true;
    }
    const helper = new JwtHelperService(token);
    return helper.isTokenExpired(token);
  }
  getAllManagers(managerTeam:string): Observable<IManager[]> {
    const API: string = `${this.apiUrl}/Managers?managerTeam=${managerTeam}`;
  
    return this.http.get<IManager[]>(API).pipe(
      catchError(this.handleError)
    );
  }  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}, message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe, RecipePagination } from '../models/recipe';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUserFavoriteIds(): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiBaseUrl}Users/favoritesIds`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  public getUserFavorites(page: number, pageSize:number): Observable<RecipePagination> {
    return this.http.get<RecipePagination>(`${environment.apiBaseUrl}Users/favorites?page=${page}&pageSize=${pageSize}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  public deleteUserFavorite(recipeId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}Users/favorite/${recipeId}`;
    return this.http.delete(url)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public postUserFavorite(id: number): Observable<any> {
    const url = `${environment.apiBaseUrl}Users/favorite/${id}`;
    return this.http.post(url, {})
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getUserCreatedRecipes(page: number, pageSize: number): Observable<RecipePagination> {
    return this.http.get<RecipePagination>(`${environment.apiBaseUrl}Users/myrecipes?page=${page}&pageSize=${pageSize}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

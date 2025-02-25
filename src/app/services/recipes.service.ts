import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe, RecipePagination } from '../models/recipe';
import { catchError, retry, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private http: HttpClient) { }

  public getRecentRecipePagination(page: number, pageSize:number): Observable<RecipePagination> {
    return this.http.get<RecipePagination>(`${environment.apiBaseUrl}recipes/recent?page=${page}&pageSize=${pageSize}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public getRecipePaginationByKeyword(keyword: string, page: number, pageSize:number): Observable<RecipePagination> {
    return this.http.get<RecipePagination>(`${environment.apiBaseUrl}recipes/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public getById(recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.apiBaseUrl}recipes/${recipeId}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public upload(formData: FormData) {
    return this.http.post<{ path: string }>(`${environment.apiBaseUrl}recipes/upload`, formData)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public postSharedRecipe(recipeForm: FormGroup): Observable<Recipe> {
    const recipeData: Recipe = recipeForm.getRawValue();

    return this.http.post<Recipe>(`${environment.apiBaseUrl}Recipes/share`, recipeData)
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

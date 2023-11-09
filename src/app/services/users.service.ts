import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from '../models/recipe';
import { RecipeFull } from '../models/recipe-full';
import { FormGroup } from '@angular/forms';
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
  
  public getUserFavorites(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.apiBaseUrl}Users/favorites`)
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

  public addUserFavorite(recipeId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}Users/favorite/${recipeId}`;
    return this.http.post(url, {})
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getUserCreatedRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.apiBaseUrl}Users/myrecipes`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public upload(formData: FormData) {
    return this.http.post<{ path: string }>(`${environment.apiBaseUrl}Users/upload`, formData)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public postSharedRecipe(recipeForm: FormGroup): Observable<number> {
    const recipe: RecipeFull = recipeForm.value
    return this.http.post<number>(`${environment.apiBaseUrl}Users/share`, recipe)
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

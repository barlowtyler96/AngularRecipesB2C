import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from '../models/recipe';
import { RecipeFull } from '../models/recipe-full';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUserFavoriteIds(): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiBaseUrl}Users/favoritesIds`)
  }
  
  public getUserFavorites(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.apiBaseUrl}Users/favorites`)
  }

  public deleteUserFavorite(recipeId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}Users/favorite/${recipeId}`;
    return this.http.delete(url);
  }

  public addUserFavorite(recipeId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}Users/favorite/${recipeId}`;
    return this.http.post(url, {});
  }

  getUserCreatedRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.apiBaseUrl}Users/myrecipes`)
  }

  public upload(formData: FormData) {
    return this.http.post<{ path: string }>(
      `${environment.apiBaseUrl}Users/upload`,
      formData
    );
  }

  public postSharedRecipe(recipeForm: FormGroup): Observable<number> {
    const recipe: RecipeFull = recipeForm.value
    return this.http.post<number>(
      `${environment.apiBaseUrl}Users/share`,
      recipe
    );
  }
}

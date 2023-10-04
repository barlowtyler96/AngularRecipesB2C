import { Injectable } from '@angular/core';
import { RecipePagination } from '../models/recipe'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { RecipeFull } from '../models/recipe-full';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private http: HttpClient) { }

  public getRecipePagination(page: number, pageSize:number): Observable<RecipePagination> {
    return this.http.get<RecipePagination>(`${environment.apiBaseUrl}recipes/recent?page=${page}&pageSize=${pageSize}`)
  }

  public getRecipePaginationByKeyword(keyword: string, page: number, pageSize:number): Observable<RecipePagination> {
    return this.http.get<RecipePagination>(`${environment.apiBaseUrl}recipes/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
  }

  public getFullRecipeById(recipeId: number): Observable<RecipeFull> {
    return this.http.get<RecipeFull>(`${environment.apiBaseUrl}recipes/${recipeId}`)
  }
} 

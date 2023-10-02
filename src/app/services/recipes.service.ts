import { Injectable } from '@angular/core';
import { RecipePagination } from '../models/recipe'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private http: HttpClient) { }

  public getRecipePagination(page: number, pageSize:number): Observable<RecipePagination> {
    return this.http.get<RecipePagination>(`${environment.apiBaseUrl}recipes/recent?page=${page}&pageSize=${pageSize}`)
  }
} 

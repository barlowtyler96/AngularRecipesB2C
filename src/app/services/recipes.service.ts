import { Injectable } from '@angular/core';
import { RecipePaginationImpl } from '../models/recipe'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  public getRecipePagination(page: number, pageSize:number): Observable<RecipePaginationImpl> {
    return this.http.get<RecipePaginationImpl>(`${environment.apiBaseUrl}recipes/recent?page=${page}&pageSize=${pageSize}`)
  }
  constructor(private http: HttpClient) { }
} 

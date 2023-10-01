import { Component, OnInit } from '@angular/core';
import { RecipePaginationImpl } from '../../models/recipe'
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipePagination: RecipePaginationImpl = {
    totalCount: 0,
    pageSize: 8,
    currentPageNumber: 1,
    totalPages: 0,
    data: []
  }

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.loadData(this.recipePagination.currentPageNumber);
  }

  loadData(page: number) {
    this.recipesService.getRecipePagination(page, this.recipePagination.pageSize).subscribe((response) => {
      this.recipePagination.currentPageNumber = response.currentPageNumber;
      this.recipePagination.data = response.data;
      this.recipePagination.totalCount = response.totalCount;
      this.recipePagination.totalPages = response.totalPages;
    });
  }
}

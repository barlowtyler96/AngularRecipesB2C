import { Component, OnInit } from '@angular/core';
import { RecipePagination } from '../../models/recipe'
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipePagination: RecipePagination = {
    currentPageNumber: 1,
    pageSize: 8,
    totalCount: 0,
    totalPages: 0,
    data: []
  };

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.loadData(this.recipePagination.currentPageNumber);
  }

  loadData(page: number) {
    this.recipesService.getRecipePagination(page, this.recipePagination.pageSize)
      .subscribe((data) => {
        this.recipePagination = data;
      });
  }
}

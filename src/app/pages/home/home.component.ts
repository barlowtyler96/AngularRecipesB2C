import { Component, OnInit } from '@angular/core';
import { RecipePagination } from '../../models/recipe'
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipePagination!: RecipePagination;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.loadData(this.recipePagination.currentPageNumber);
  }

  loadData(page: number) {
    this.recipesService.getRecipePagination(page, this.recipePagination.pageSize).subscribe((response) => {
      this.recipePagination.data = response.data;
      this.recipePagination.totalCount = response.totalCount;
      this.recipePagination.totalPages = response.totalPages;
    });
  }
}

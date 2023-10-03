import { Component } from '@angular/core';
import { RecipePagination } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent {
  searchText = '';
  recipePagination: RecipePagination = {
    currentPageNumber: 1,
    pageSize: 8,
    totalCount: 0,
    totalPages: 0,
    data: []
  };

  constructor(private recipesService: RecipesService) { }
  
  onSearch(searchText: string) { 
    this.searchText = searchText
    this.loadData(1);
  }

  loadData(page: number) {
    this.recipesService.getRecipePaginationByKeyword(this.searchText, page, this.recipePagination.pageSize)
      .subscribe((data) => {
        this.recipePagination = data;
      });
  }
}

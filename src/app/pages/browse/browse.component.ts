import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RecipePagination } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent {
  searchText = '';
  recipePagination$!: Observable<RecipePagination>;
  headerTitle!: string;

  constructor(private recipesService: RecipesService) { }
  
  ngOnInit() {
    this.headerTitle = "Browse";
  }

  onSearch(searchText: string) { 
    this.searchText = searchText
    this.loadData(1);
  }

  loadData(page: number) {
    this.recipePagination$ = this.recipesService.getRecipePaginationByKeyword(this.searchText, page,  8);
  }
}

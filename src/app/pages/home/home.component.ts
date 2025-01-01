import { Component, OnInit } from '@angular/core';
import { RecipePagination } from '../../models/recipe'
import { RecipesService } from 'src/app/services/recipes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipePagination$!: Observable<RecipePagination>;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  headerTitle!: string;
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.loadData(this.currentPage);
    this.headerTitle = "Recently Added";
  }

  loadData(page: number) {
    this.currentPage = page;
    this.recipePagination$ = this.recipesService.getRecentRecipePagination(page, this.itemsPerPage);
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.loadData(1);
  }
}

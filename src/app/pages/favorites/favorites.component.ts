import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe, RecipePagination } from 'src/app/models/recipe';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  recipePagination$!: Observable<RecipePagination>;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  headerTitle!: string;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadData(this.currentPage);
    this.headerTitle = "Favorites"
  }

  loadData(page: number) {
    this.recipePagination$ = this.usersService.getUserFavorites(page, this.itemsPerPage);
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.loadData(1);
  }
}

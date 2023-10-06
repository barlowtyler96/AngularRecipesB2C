import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe, RecipePagination } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  recipes$!: Observable<Recipe[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(page: number) {
    this.recipes$ = this.usersService.getUserFavorites();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from 'src/app/models/recipe';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;
  headerTitle!: string;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadData();
    this.headerTitle = "Favorites"
  }

  loadData() {
    this.recipes$ = this.usersService.getUserFavorites();
  }
}

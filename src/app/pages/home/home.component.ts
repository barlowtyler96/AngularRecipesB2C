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

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(page: number) {
    this.recipePagination$ = this.recipesService.getRecipePagination(page, 8);
  }
}

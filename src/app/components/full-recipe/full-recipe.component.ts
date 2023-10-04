import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RecipeFull } from 'src/app/models/recipe-full';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.scss']
})
export class FullRecipeComponent implements OnInit {
  @Input() recipeId!: number;
  fullRecipe$!: Observable<RecipeFull>;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.fullRecipe$ = this.recipesService.getFullRecipeById(this.recipeId);
  }
}

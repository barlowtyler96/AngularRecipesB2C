import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from 'src/app/models/recipe';
import { Ingredient } from 'src/app/models/ingredient';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.scss']
})
export class FullRecipeComponent implements OnInit {
  @Input() recipeId!: number;
  fullRecipe!: Recipe;
  ingredientArray1: Ingredient[] = [];
  ingredientArray2: Ingredient[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesService.getFullRecipeById(this.recipeId)
      .subscribe((data) => {
        this.fullRecipe = data;
        const midpoint = Math.ceil(data.ingredients.length / 2);
        this.ingredientArray1 = data.ingredients.slice(0, midpoint);
        this.ingredientArray2 = data.ingredients.slice(midpoint);
        setTimeout(() => {
          const recipeElement = document.getElementById("fullRecipe");
          if (recipeElement) {
            recipeElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      })

  }
}

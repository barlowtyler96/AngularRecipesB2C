import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RecipeFull } from 'src/app/models/recipe-full';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.scss']
})
export class FullRecipeComponent implements OnInit {
  @Input() recipeId!: number;
  fullRecipe!: RecipeFull;
  ingredientArray1: RecipeIngredient[] = [];
  ingredientArray2: RecipeIngredient[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesService.getFullRecipeById(this.recipeId)
      .subscribe((data) => {
        this.fullRecipe = data;
        const midpoint = Math.ceil(data.recipeIngredients.length / 2);
        this.ingredientArray1 = data.recipeIngredients.slice(0, midpoint);
        this.ingredientArray2 = data.recipeIngredients.slice(midpoint);
        setTimeout(() => {
          const recipeElement = document.getElementById("fullRecipe");
          if (recipeElement) {
            recipeElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      })

  }
}

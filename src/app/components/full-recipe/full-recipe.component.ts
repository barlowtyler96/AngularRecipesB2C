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
  fullRecipe!: RecipeFull;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.getFullRecipeById(this.recipeId)
      .subscribe((data) => {
        this.fullRecipe = data;
        const recipeElement = document.getElementById("fullRecipe");
        setTimeout(() => {
          const recipeElement = document.getElementById("fullRecipe");
          if (recipeElement) {
            recipeElement.scrollIntoView({ behavior: 'smooth' });
          } 
        }, 150);
      })
  }
}

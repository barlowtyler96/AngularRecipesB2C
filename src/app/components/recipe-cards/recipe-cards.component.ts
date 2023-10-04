import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.scss']
})
export class RecipeCardsComponent {
  @Input() recipes!: Recipe[];
  @Input() recipe!: Recipe; // Input property for recipe data
  selectedRecipeId!: number;
  
  showFullRecipe(recipeId: number) {
    this.selectedRecipeId = recipeId;
  }
}

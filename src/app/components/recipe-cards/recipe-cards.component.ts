import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { UsersService } from 'src/app/services/users.service';
import { FullRecipeComponent } from '../full-recipe/full-recipe.component';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.scss']
})
export class RecipeCardsComponent implements OnInit {
  @Input() recipes!: Recipe[];
  @ViewChild(FullRecipeComponent) modalComponent!: FullRecipeComponent;

  selectedRecipe?: Recipe;
  isSignedIn: boolean = false;
  ingredientArray1: Ingredient[] = [];
  ingredientArray2: Ingredient[] = [];

  constructor(private usersService: UsersService, private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setSignedInStatus();
      })
  }

  setSignedInStatus() {
    this.isSignedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  postUserFavorite(recipeId: number, isFavorite: boolean) {
    if (isFavorite) {
      this.usersService.deleteUserFavorite(recipeId).subscribe({
      });
      
    } else if (!isFavorite) {
      this.usersService.postUserFavorite(recipeId).subscribe({
      });
    }
  }

  openModal(recipe: Recipe) {
    this.selectedRecipe = recipe;
    const midpoint = Math.ceil(recipe.ingredients.length / 2);
    this.ingredientArray1 = recipe.ingredients.slice(0, midpoint);
    this.ingredientArray2 = recipe.ingredients.slice(midpoint);
    this.modalComponent?.openModal();
  }
}

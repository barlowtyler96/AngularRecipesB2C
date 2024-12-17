import { Component, Input, OnInit,} from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.scss']
})
export class RecipeCardsComponent implements OnInit {
  @Input() recipes!: Recipe[];
  @Input() recipe!: Recipe;

  userFavoriteIds: number[] = [];
  selectedRecipeId!: number;
  isSignedIn: boolean = false;
  isShowingRecipe: boolean = false;

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

      if (this.isSignedIn) {
        this.usersService.getUserFavoriteIds().subscribe({
          next: (favoriteIds: number[]) => {
            this.userFavoriteIds = favoriteIds;
          },
          error: (error: any) => {
            console.error('Error fetching user favorite IDs:', error);
          }
        });
      }
  }

  setSignedInStatus() {
    this.isSignedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  showFullRecipe(recipeId: number) {
    this.selectedRecipeId = recipeId;
    this.isShowingRecipe = !this.isShowingRecipe;
  }

  postUserFavorite(recipeId: number, isFavorite: boolean) {
    if (isFavorite) {
      this.usersService.deleteUserFavorite(recipeId).subscribe({
      });
      const index = this.userFavoriteIds.indexOf(recipeId);
      if (index !== -1) {
        this.userFavoriteIds.splice(index, 1);
      }
    } else if (!isFavorite) {
      this.usersService.addUserFavorite(recipeId).subscribe({
      });
      this.userFavoriteIds.push(recipeId);
    }
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RecipePagination } from 'src/app/models/recipe';
import { RecipeFull } from 'src/app/models/recipe-full';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient'
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent {
  filename = '';
  createdRecipeId!: number;
  createdRecipes$!: Observable<RecipePagination>;
  recipe: RecipeFull = {
    recipeId: 0,
    name: '',
    description: '',
    instructions: '',
    imageUrl: '',
    recipeIngredients: []
  }

  constructor(private usersService: UsersService, private recipesService: RecipesService) { }

  
  setFilename(files: any) {
    if (files[0]) {
      // Generate a unique filename using a timestamp and a random string
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(7);
      this.filename = `${timestamp}_${randomString}_${files[0].name}`;
    }
  }

  onSubmit(files: any) {
    const formData = new FormData();

    if (files[0]) {
      // Use the generated unique filename when appending to FormData
      formData.append(this.filename, files[0]);
    }

    this.usersService
    .upload(formData)
    .subscribe(({ path }) => {
      this.recipe.imageUrl = path;

      this.usersService.postSharedRecipe(this.recipe).subscribe((recipeId) => {
        this.createdRecipeId = recipeId;
      });
      this.createdRecipes$ = this.recipesService.getRecipePagination(1,8)
    });
  }

  addIngredient() {
    this.recipe.recipeIngredients.push({
      recipeId: 0,
      ingredientId: 0,
      amount: 0,
      unit: '',
      ingredientName: ''
    });
  }

  removeIngredient(index: number) {
    this.recipe.recipeIngredients.splice(index, 1);
  }
}

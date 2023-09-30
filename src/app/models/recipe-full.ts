import { RecipeIngredient } from "./recipe-ingredient";

export interface RecipePaginationFull {
    totalCount: number;
    pageSize: number;
    currentPageNumber: number;
    totalPages: number;
    data: RecipeFull[];
  }
  
  export interface RecipeFull {
    recipeId: number;
    name: string;
    description: string;
    instructions: string;
    imageUrl: string;
    recipeIngredients: RecipeIngredient[];
  }

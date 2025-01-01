import { Ingredient } from "./ingredient";

export interface RecipePagination {
    totalCount: number;
    pageSize: number;
    currentPageNumber: number;
    totalPages: number;
    data: Recipe[];
  }
  
  export interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    imageUrl: string;
    ingredients: Ingredient[];
    isFavorited: boolean;
  }
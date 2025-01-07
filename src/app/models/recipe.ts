import { Ingredient } from "./ingredient";
import { User } from "./user";

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
    createdBy: User;
    ingredients: Ingredient[];
    isFavorited: boolean;
  }
export interface RecipePagination {
    totalCount: number;
    pageSize: number;
    currentPageNumber: number;
    totalPages: number;
    data: Recipe[];
  }
  
  export interface Recipe {
    recipeId: number;
    name: string;
    description: string;
    imageUrl: string;
  }
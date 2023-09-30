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

export class RecipePaginationImpl implements RecipePagination {
  totalCount!: number;
  pageSize: number = 8;
  currentPageNumber: number = 1;
  totalPages!: number;
  data!: Recipe[];
}


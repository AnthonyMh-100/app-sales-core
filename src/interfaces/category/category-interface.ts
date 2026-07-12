export interface Category {
  id: string;
  active: boolean;
  name: string;
}

export interface TableCategories {
  categories: Category[];
}

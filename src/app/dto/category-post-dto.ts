export interface CategoryGetDTO {
  id: number;
  categoryName: string;
  description: string;
}

export class CategoryPostDto {
  categoryName: string;
  description: string;

  constructor() {
    this.categoryName = '';
    this.description = '';
  }
}

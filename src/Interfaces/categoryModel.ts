export default interface categoryModel {
  id: number;
  name: string;
  subCategories: categoryModel[];
}

import categoryModel from "./categoryModel";
import productImageModel from "./productImageModel";

export default interface productModel {
  id: number;
  categoryId: number;
  category: categoryModel;
  name: string;
  description: string;
  price: number;
  stock: number;
  productImages: productImageModel[];
  productAttributes: string[];
}

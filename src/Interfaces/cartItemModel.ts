import laptopModel from "./laptopModel";

export default interface cartItemModel {
  id?: number;
  laptopId?: number;
  laptop?: laptopModel;
  quantity?: number;
}

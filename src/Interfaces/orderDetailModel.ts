import laptopModel from "./laptopModel";

export default interface orderDetailModel {
  orderDetailId?: number;
  orderHeaderId?: number;
  laptopId?: number;
  laptop?: laptopModel;
  quantity?: number;
  itemName?: string;
  price?: number;
}

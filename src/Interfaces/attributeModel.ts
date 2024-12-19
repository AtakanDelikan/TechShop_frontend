import { SD_DataTypes } from "../Utility/SD";

export default interface attributeModel {
  id: string;
  name: string;
  dataType: SD_DataTypes;
  value: string;
}

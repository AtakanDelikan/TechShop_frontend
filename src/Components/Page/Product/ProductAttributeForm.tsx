import React, { useEffect } from "react";
import { useGetCategoryAttributesByIdQuery } from "../../../Apis/categoryAttributeApi";
import { attributeModel, categoryModel } from "../../../Interfaces";
import { MainLoader } from "../Common";
import { SD_DataTypes } from "../../../Utility/SD";

interface Props {
  category: categoryModel;
  setAttribute: (value: React.SetStateAction<attributeModel[]>) => void;
  attributes: attributeModel[];
}

function ProductAttributeForm(props: Props) {
  const { data, isLoading } = useGetCategoryAttributesByIdQuery(
    props.category.id
  );

  const testAttribute: attributeModel = {
    id: "0",
    name: "testAttribute",
    dataType: SD_DataTypes.STRING,
    value: "",
  };

  useEffect(() => {
    if (!isLoading) {
      const attributes: attributeModel[] = data?.result?.map((item: any) => ({
        id: item.id, // Convert id to string if needed .toString()
        name: item.attributeName,
        dataType: item.dataType, // Use the same dataType
        value: "", // Set value as an empty string
      }));
      if (attributes === undefined) {
        props.setAttribute([testAttribute]);
      } else {
        props.setAttribute(attributes);
      }
    }
  }, [data]);

  const handleUpdateAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setAttribute((prev) =>
      prev.map((attr) =>
        attr.id.toString() === e.target.name
          ? { ...attr, value: e.target.value }
          : attr
      )
    );
  };

  const renderInput = (attribute: attributeModel) => {
    if (attribute.dataType === SD_DataTypes.STRING) {
      return (
        <input
          type="text"
          className="form-control"
          placeholder="Enter Text"
          name={attribute.id}
          value={attribute.value}
          onChange={handleUpdateAttribute}
        />
      );
    }

    if (attribute.dataType === SD_DataTypes.INTEGER) {
      return (
        <input
          type="number"
          className="form-control"
          placeholder="Enter Integer"
          name={attribute.id}
          value={attribute.value}
          onChange={handleUpdateAttribute}
        />
      );
    }

    if (attribute.dataType === SD_DataTypes.DECIMAL) {
      return (
        <input
          type="number"
          className="form-control"
          placeholder="Enter Decimal"
          name={attribute.id}
          value={attribute.value}
          onChange={handleUpdateAttribute}
        />
      );
    }

    if (attribute.dataType === SD_DataTypes.BOOLEAN) {
      return (
        <>
          Yes
          <input
            className="form-check-input m-2"
            type="radio"
            name={attribute.id}
            value="true"
            onChange={handleUpdateAttribute}
            checked={attribute.value === "true"}
          />
          No
          <input
            className="form-check-input m-2"
            type="radio"
            name={attribute.id}
            value="false"
            onChange={handleUpdateAttribute}
            checked={attribute.value === "false"}
          />
          Not specified
          <input
            className="form-check-input m-2"
            type="radio"
            name={attribute.id}
            value=""
            onChange={handleUpdateAttribute}
            checked={attribute.value === ""}
          />
        </>
      );
    }
  };

  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <>
      <div>
        {data?.result.length > 0 && (
          <>
            <div className="row justify-content-md-center mt-3">
              <div className="border">
                <div className="row p-1 justify-content-md-center">
                  <div className="col-6 fw-bold">Attribute Name</div>
                  <div className="col-6 fw-bold">Attribute Value</div>
                </div>
              </div>
            </div>
            {props.attributes.map((attribute: attributeModel) => (
              <div className="row justify-content-md-center" key={attribute.id}>
                <div className="border">
                  <div className="row p-1">
                    <div className="col-6">{attribute.name}</div>
                    <div className="col-6">{renderInput(attribute)}</div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default ProductAttributeForm;

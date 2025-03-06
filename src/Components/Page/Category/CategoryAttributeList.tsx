import React from "react";
import { useGetCategoryAttributesByIdQuery } from "../../../Apis/categoryAttributeApi";
import { categoryModel } from "../../../Interfaces";
import { MainLoader } from "../Common";

interface Props {
  category: categoryModel;
}

function CategoryAttributeList(props: Props) {
  const { data, isLoading } = useGetCategoryAttributesByIdQuery(
    props.category.id
  );
  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <>
      <div>
        {data?.result?.attributes?.length > 0 && (
          <>
            <div className="row justify-content-md-center mt-3">
              <div className="col-6 border">
                <div className="row p-1 justify-content-md-center">
                  <div className="col-8 fw-bold">Attribute Name</div>
                  <div className="col-4 fw-bold">Data Type</div>
                </div>
              </div>
            </div>
            {data?.result?.attributes?.map((attribute: any) => (
              <div className="row justify-content-md-center" key={attribute.id}>
                <div className="col-6 border">
                  <div className="row p-1">
                    <div className="col-8">{attribute.attributeName}</div>
                    {/* TODO consider making a utility function getDataTypeName */}
                    <div className="col-4">
                      {(attribute.dataType === 1 && "Text") ||
                        (attribute.dataType === 2 && "Integer") ||
                        (attribute.dataType === 3 && "Decimal") ||
                        (attribute.dataType === 4 && "Boolean") ||
                        "Unknown"}
                    </div>
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

export default CategoryAttributeList;

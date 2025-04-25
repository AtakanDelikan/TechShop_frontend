import React, { useState } from "react";
import {
  useDeleteCategoryAttributeMutation,
  useGetCategoryAttributesByIdQuery,
  useUpdateCategoryAttributeMutation,
} from "../../../Apis/categoryAttributeApi";
import { apiResponse, categoryModel } from "../../../Interfaces";
import { MainLoader } from "../Common";
import { toastNotify } from "../../../Helper";

interface Props {
  category: categoryModel;
}

function CategoryAttributeList(props: Props) {
  const [updatingId, setUpdatingId] = useState(0);
  const [newAttributeName, setNewAttributeName] = useState("");
  const [updateCategoryAttribute] = useUpdateCategoryAttributeMutation();
  const [deleteCategoryAttribute] = useDeleteCategoryAttributeMutation();
  const { data, isLoading } = useGetCategoryAttributesByIdQuery(
    props.category.id
  );

  const handleEdit = (attributeId: number, attributeName: string) => {
    setUpdatingId(attributeId);
    setNewAttributeName(attributeName);
  };

  const handleTextChange = (e: any) => {
    setNewAttributeName(e.target.value);
  };

  const handleUpdate = async (attributeId: number) => {
    const attribute = {
      attributeName: newAttributeName,
    };

    var response: apiResponse = await updateCategoryAttribute({
      data: attribute,
      id: attributeId,
    });
    setUpdatingId(0);
    if (response.data) {
      toastNotify("Category attribute updated successfully!");
    } else if (response.error) {
      toastNotify("There has been some error!", "error");
    }
  };

  const handleDelete = async (attributeId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attribute?"
    );
    if (confirmDelete) {
      var response: apiResponse = await deleteCategoryAttribute(attributeId);
      if (response.data) {
        toastNotify("Category attribute deleted successfully!");
      } else if (response.error) {
        toastNotify("There has been some error!", "error");
      }
    }
  };

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
              <div className="col-1"></div>
            </div>
            {data?.result?.attributes?.map((attribute: any) => (
              <div className="row justify-content-md-center" key={attribute.id}>
                <div className="col-6 border">
                  <div className="row p-1">
                    <div className="col-8">
                      {attribute.id === updatingId ? (
                        <input
                          type="text"
                          className="form-control text-center"
                          placeholder="Enter Attribute Name"
                          required
                          name="attributeName"
                          value={newAttributeName}
                          onChange={handleTextChange}
                        />
                      ) : (
                        attribute.attributeName
                      )}
                    </div>
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
                <div className="col-1 m-0 p-0">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm m-1"
                    style={{ padding: "0.2rem 0.4rem" }}
                    onClick={() =>
                      attribute.id === updatingId
                        ? setUpdatingId(0)
                        : handleDelete(attribute.id)
                    }
                  >
                    {attribute.id === updatingId ? (
                      <i className="bi bi-x-lg"></i>
                    ) : (
                      <i className="bi bi-trash"></i>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    style={{ padding: "0.2rem 0.4rem" }}
                    onClick={() =>
                      attribute.id === updatingId
                        ? handleUpdate(attribute.id)
                        : handleEdit(attribute.id, attribute.attributeName)
                    }
                  >
                    {attribute.id === updatingId ? (
                      <i className="bi bi-check-lg"></i>
                    ) : (
                      <i className="bi bi-pencil-fill"></i>
                    )}
                  </button>
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

import React, { useState } from "react";
import { useGetCategoriesQuery } from "../../Apis/categoryApi";
import { MainLoader } from "../../Components/Page/Common";
import {
  CategoryAttributeList,
  CategoryDropdownButton,
} from "../../Components/Page/Category";
import { apiResponse, categoryModel } from "../../Interfaces";
import { inputHelper, toastNotify } from "../../Helper";
import { SD_DataTypes } from "../../Utility/SD";
import { useCreateCategoryAttributeMutation } from "../../Apis/categoryAttributeApi";

const rootCategory: categoryModel = {
  id: 0,
  name: "No Parent",
  subCategories: [],
};

function CategoryAttributes() {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [createCategoryAttribute] = useCreateCategoryAttributeMutation();
  const [selectedCategory, setCategory] = useState(rootCategory);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    attributeName: "",
    dataType: "0",
  });

  const onCategorySelect = (category: categoryModel) => {
    setCategory(category);
    console.log(category.id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("CategoryId", selectedCategory.id.toString());
    formData.append("AttributeName", userInput.attributeName);
    formData.append("DataType", userInput.dataType);

    const response: apiResponse = await createCategoryAttribute(formData);

    console.log(response);
    if (response.data) {
      toastNotify("Category Attribute created successfully!");
    } else if (response.error) {
      toastNotify("There has been some error!", "error");
    }

    setLoading(false);
  };

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <div className="container text-center">
      <h1 className="mt-5">Category Attributes</h1>
      <div className="mt-5">
        <CategoryDropdownButton
          categories={data.result}
          onSelect={onCategorySelect}
        />
      </div>
      <div>
        <CategoryAttributeList category={selectedCategory} />
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <h2 className="mt-5">New Category Attribute</h2>
        <div className="mt-5">
          <div className="row justify-content-md-center">
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Attribute Name"
                required
                name="attributeName"
                value={userInput.attributeName}
                onChange={handleUserInput}
              />
            </div>
            <div className="col-sm-2">
              <select
                className="form-control form-select"
                required
                name="dataType"
                value={userInput.dataType}
                onChange={handleUserInput}
              >
                <option value="0">--Select Data Type--</option>
                <option value={`${SD_DataTypes.STRING}`}>String</option>
                <option value={`${SD_DataTypes.INTEGER}`}>Integer</option>
                <option value={`${SD_DataTypes.DECIMAL}`}>Decimal</option>
                <option value={`${SD_DataTypes.BOOLEAN}`}>Boolean</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              Create Category Attribute
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CategoryAttributes;

import React, { useEffect, useState } from "react";
import { CategoryDropdownButton } from "../../Components/Page/Category";
import { apiResponse, categoryModel } from "../../Interfaces";
import { MainLoader } from "../../Components/Page/Common";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../Apis/categoryApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";

const CategoryUpsert = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoryByIdQuery(id);

  const { data, isLoading } = useGetCategoriesQuery(null);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    description: "",
  });

  const rootCategory: categoryModel = {
    id: 0,
    name: "No Parent",
    subCategories: [],
  };
  const [parentCategory, setParentCategory] = useState(rootCategory);

  useEffect(() => {
    if (data && categoryData && categoryData.result) {
      const tempData = {
        name: categoryData.result.name,
        description: categoryData.result.description,
      };
      setUserInput(tempData);
      const tempCategory: categoryModel = {
        id: categoryData.result.parentCategoryId,
        name: categoryData.result.parentCategory.name, //categoryData.result.parentCategory.name,
        subCategories: [],
      };
      setParentCategory(tempCategory);
    }
  }, [categoryData, data]);

  if (isLoading) {
    return <MainLoader />;
  }
  const updatedCategories = [rootCategory, ...data.result];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    var response: apiResponse;

    const category = {
      name: userInput.name,
      description: userInput.description,
      parentCategoryId: parentCategory.id,
    };

    if (id) {
      response = await updateCategory({
        data: category,
        id: id,
      });
    } else {
      response = await createCategory(category);
    }

    if (response.data && !id) {
      toastNotify("Category created successfully!");
    } else if (response.data && id) {
      toastNotify("Category updated successfully!");
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

  // if id is given but no product is found
  if (id && !isCategoryLoading && !categoryData) {
    return <NotFound />;
  }

  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">
          {id ? `Update Category #${id}` : "Create New Category"}
        </h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              required
              name="description"
              value={userInput.description}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <CategoryDropdownButton
              categories={updatedCategories}
              onSelect={setParentCategory}
              initialTitle={
                categoryData?.result
                  ? categoryData.result.parentCategory.name ?? "No Parent"
                  : undefined
              }
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-success  m-5"
            disabled={loading}
          >
            {id ? "Update" : "Create"}
          </button>
          <button
            onClick={() => navigate("/category/categoryList")}
            className="btn btn-primary"
          >
            Back to Category List
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryUpsert;

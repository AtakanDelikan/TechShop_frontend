import React, { useState } from "react";
import { CategoryDropdownButton } from "../Components/Page/Category";
import { apiResponse, categoryModel } from "../Interfaces";
import { MainLoader } from "../Components/Page/Common";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "../Apis/categoryApi";
import { inputHelper, toastNotify } from "../Helper";

const TestPage = () => {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [createCategory] = useCreateCategoryMutation();

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
  if (isLoading) {
    return <MainLoader />;
  }
  const updatedCategories = [rootCategory, ...data.result];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await createCategory({
      name: userInput.name,
      description: userInput.description,
      parentCategoryId: parentCategory.id,
    });

    console.log(response);
    if (response.data) {
      toastNotify("Category created successfully!");
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

  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Create New Category</h1>
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
            />
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestPage;

import React, { useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { CategoryDropdownButton } from "../../Components/Page/Category";
import { useGetCategoriesQuery } from "../../Apis/categoryApi";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse, attributeModel, categoryModel } from "../../Interfaces";
import { ProductAttributeForm } from "../../Components/Page/Product";
import { SD_DataTypes } from "../../Utility/SD";
import { useCreateProductMutation } from "../../Apis/productApi";
import { useCreateProductAttributeMutation } from "../../Apis/productAttributeApi";

function ProductUpsert() {
  // TODO put root category into a separate file
  const rootCategory: categoryModel = {
    id: 0,
    name: "",
    subCategories: [],
  };

  const { data, isLoading } = useGetCategoriesQuery(null);
  const [createProduct] = useCreateProductMutation();
  const [createProductAttribute] = useCreateProductAttributeMutation();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [attributeInput, setAttributeInput] = useState<attributeModel[]>([]);

  const [selectedCategory, setCategory] = useState(rootCategory);
  if (isLoading) {
    return <MainLoader />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (selectedCategory.id === 0) {
      toastNotify("Please select a category!", "error");
      setLoading(false);
      return;
    }
    const response: apiResponse = await createProduct({
      categoryId: selectedCategory.id,
      name: userInput.name,
      description: userInput.description,
      price: userInput.price,
      stock: userInput.stock,
    });

    if (response.error || response.data?.result.id === undefined) {
      toastNotify("There has been some error!", "error");
      setLoading(false);
      return;
    }

    // TODO if value is "" empty do not call api. Instead of map use something else to handle errors
    attributeInput.map((attribute: attributeModel) =>
      createProductAttribute({
        productId: response.data?.result.id,
        categoryAttributeId: attribute.id,
        value: attribute.value,
      })
    );

    if (response.data) {
      toastNotify("Product created successfully!");
    }

    console.log(response);
    console.log(response.data.result.id);

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
        <h1 className="mt-5">Create New Product</h1>
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
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={userInput.price}
              onChange={handleUserInput}
            />
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Stock Amount"
              name="stock"
              value={userInput.stock}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <CategoryDropdownButton
              categories={data.result}
              onSelect={setCategory}
            />
          </div>
          <div>
            <ProductAttributeForm
              category={selectedCategory}
              setAttribute={setAttributeInput}
              attributes={attributeInput}
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
}

export default ProductUpsert;

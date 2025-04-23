import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { CategoryDropdownButton } from "../../Components/Page/Category";
import { useGetCategoriesQuery } from "../../Apis/categoryApi";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse, attributeModel, categoryModel } from "../../Interfaces";
import {
  ProductAttributeForm,
  ProductImage,
} from "../../Components/Page/Product";
import { SD_DataTypes } from "../../Utility/SD";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../Apis/productApi";
import {
  useCreateProductAttributeMutation,
  useUpdateProductAttributeMutation,
} from "../../Apis/productAttributeApi";
import { useCreateProductImagesMutation } from "../../Apis/productImageApi";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";

function ProductUpsert() {
  const rootCategory: categoryModel = {
    id: 0,
    name: "",
    subCategories: [],
  };

  const { id } = useParams();
  const { data: productData, isLoading: isProductLoading } =
    useGetProductByIdQuery(id);
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [createProductAttribute] = useCreateProductAttributeMutation();
  const [updateProductAttribute] = useUpdateProductAttributeMutation();
  const [createProductImages] = useCreateProductImagesMutation();

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (data && productData && productData.result) {
      const tempData = {
        name: productData.result.name,
        description: productData.result.description,
        price: productData.result.price,
        stock: productData.result.stock,
      };
      const urls = productData.result.productImages.map(
        (item: any) => item.url
      );
      setImages(urls);
      setUserInput(tempData);
      const tempCategory: categoryModel = {
        id: productData.result.categoryId,
        name: "",
        subCategories: [],
      };
      setCategory(tempCategory);
    }
  }, [productData, data]);

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
    const product = {
      categoryId: selectedCategory.id,
      name: userInput.name,
      description: userInput.description,
      price: userInput.price,
      stock: userInput.stock,
    };

    var response: apiResponse;

    if (id) {
      response = await updateProduct({
        data: product,
        id: id,
      });
    } else {
      response = await createProduct(product);
    }

    console.log(response);

    if (response.error || (!id && response.data?.result?.id === undefined)) {
      toastNotify("There has been some error!", "error");
      setLoading(false);
      return;
    }
    if (response.data && !id) {
      toastNotify("Product created successfully!");
    }
    if (response.data && id) {
      toastNotify("Product updated successfully!");
    }

    // TODO if value is "" (empty), do not call api to create productAttribute
    if (!id) {
      // Creating
      attributeInput.map((attribute: attributeModel) =>
        createProductAttribute({
          productId: response.data?.result.id,
          categoryAttributeId: attribute.id,
          value: attribute.value,
        })
      );
    } else {
      // Updating
      attributeInput.map((attribute: attributeModel) =>
        updateProductAttribute({
          productId: id,
          categoryAttributeId: attribute.id,
          value: attribute.value,
        })
      );
    }

    // const imagesResponse: apiResponse = await createProductImages({
    //   productId: response.data?.result.id,
    //   urls: images,
    // });
    // if (imagesResponse.error) {
    //   toastNotify("Images couldn't be uploaded!", "error");
    //   setLoading(false);
    //   return;
    // }
    // if (imagesResponse.data) {
    //   toastNotify("Images uploaded successfully!");
    // }
    toastNotify("Images upload is disabled for demo!", "error");
    navigate("/product/productList");

    setLoading(false);
  };

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleGoBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/product/productList");
  };

  // if id is given but no product is found
  if (id && !isProductLoading && !productData) {
    return <NotFound />;
  }

  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">
          {id ? `Update Product #${id}` : "Create New Product"}
        </h1>
        <div className="row">
          <div className="mt-5 col-7">
            <div className="offset-sm-3 col-xs-12 mt-4">
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
            <div className="offset-sm-3 col-xs-12 mt-4">
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
            <div className="offset-sm-3 mt-4">
              <CategoryDropdownButton
                categories={data.result}
                onSelect={setCategory}
                disabled={typeof id !== "undefined"}
              />
            </div>
            <div className="m-2">
              <ProductAttributeForm
                category={selectedCategory}
                setAttribute={setAttributeInput}
                attributes={attributeInput}
                productAttributes={productData?.result?.productAttributes}
              />
            </div>
          </div>
          <div className="mt-5 col-5">
            <ProductImage images={images} setImages={setImages} />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-success m-5"
            disabled={loading}
          >
            {id ? "Update" : "Create"}
          </button>
          <button onClick={handleGoBack} className="btn btn-primary">
            Back to Product List
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductUpsert;

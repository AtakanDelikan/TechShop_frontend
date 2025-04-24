import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MainLoader, PageSelector } from "../../Components/Page/Common";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "../../Apis/productApi";
import { CategoryDropdownButton } from "../../Components/Page/Category";
import { categoryModel } from "../../Interfaces";
import { useGetCategoriesQuery } from "../../Apis/categoryApi";

function ProductList() {
  const rootCategory: categoryModel = {
    id: 0,
    name: "All categories",
    subCategories: [],
  };
  const [selectedCategory, setCategory] = useState(rootCategory);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = (() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  })();

  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsByCategoryQuery(
      `${selectedCategory.id}?pageNumber=${pageNumber}&pageSize=15`
    );
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery(null);

  const handleProductDelete = async (id: number) => {
    toast.promise(
      deleteProduct(id),
      {
        pending: "Deleting product",
        success: "Product deleted successfully",
        error: "An error occured while deleting",
      },
      {
        theme: "light",
      }
    );
  };

  if (isProductsLoading || isCategoriesLoading) {
    return <MainLoader />;
  }
  const updatedCategories = [rootCategory, ...categoriesData.result];

  const totalPages = productsData.result.totalPages;
  const totalItems = productsData.result.totalItems;
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // Preserve existing query parameters and update page number
      setSearchParams((prevParams) => {
        const updatedParams = new URLSearchParams(prevParams);
        updatedParams.set("page", newPage.toString()); // Update or add page param
        return updatedParams;
      });
    }
  };

  return (
    <>
      <div className="table p-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="text-success">Product List</h1>
          <PageSelector
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageSelect={handlePageChange}
          />
          {/* <div>{totalItems}</div> */}
          <button
            className="btn btn-success"
            onClick={() => navigate("/product/productUpsert")}
          >
            Add New
          </button>
        </div>
        <h4>{totalItems} Products</h4>
        <CategoryDropdownButton
          categories={updatedCategories}
          onSelect={setCategory}
        />

        <div className="p-2">
          <div className="row border">
            <div className="col-2">Image</div>
            <div className="col-1">ID</div>
            <div className="col-2">Name</div>
            <div className="col-2">Category</div>
            <div className="col-1">Price</div>
            <div className="col-2">Stock</div>
            <div className="col-1">Action</div>
          </div>

          {productsData?.result?.products?.length > 0 &&
            productsData.result.products.map((product: any, index: number) => (
              <div className="row border" key={product.id}>
                <div className="col-2">
                  <img
                    src={
                      (product.images && product.images[0]) ||
                      "https://placehold.co/600x400/EEE/31343C"
                    }
                    alt="no content"
                    style={{ width: "100%", maxWidth: "120px" }}
                  />
                </div>
                <div className="col-1">{product.id}</div>
                <div className="col-2">{product.name}</div>
                <div className="col-2">{product.category.name}</div>
                <div className="col-1">{product.price}€</div>
                <div className="col-2">{product.stock}</div>
                <div className="col-1">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate(`/product/productupsert/${product.id}`)
                    }
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleProductDelete(product.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <PageSelector
        totalPages={totalPages}
        currentPage={pageNumber}
        onPageSelect={handlePageChange}
      />
    </>
  );
}

export default ProductList;

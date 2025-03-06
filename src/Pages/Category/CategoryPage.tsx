import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MainLoader, PageSelector } from "../../Components/Page/Common";
import { useGetCategoryAttributesByIdQuery } from "../../Apis/categoryAttributeApi";
import NotFound from "../NotFound";
import { SideBarFilter } from "../../Components/Page/Category";
import { useGetFilteredProductsQuery } from "../../Apis/productApi";
import { ProductCard } from "../../Components/Page/Product";

function CategoryPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [attributeQueryString, setAttributeQueryString] = useState("");
  const [queryParams, setQueryParams] = useState("");

  const pageNumber = (() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  })();

  useEffect(() => {
    const categoryId = id ? id.toString() : "";
    setQueryParams(
      "category=" +
        categoryId +
        "&attributes=" +
        attributeQueryString +
        "&pageSize=9&pageNumber=" +
        pageNumber
    );
  }, [attributeQueryString, id, pageNumber]);

  const { data, isLoading } = useGetCategoryAttributesByIdQuery(id);
  const { data: productsData, isLoading: isProductsLoading } =
    useGetFilteredProductsQuery(queryParams);

  if (isLoading || isProductsLoading) {
    return <MainLoader />;
  }

  if (!data) {
    return <NotFound />;
  }

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
      <div className="d-flex">
        {/* Sidebar */}
        <SideBarFilter
          data={data?.result}
          setAttributeQueryString={setAttributeQueryString}
        />

        {/* Main Content */}
        <div className="p-4 flex-grow-1">
          <h1>Producs</h1>
          <PageSelector
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageSelect={handlePageChange}
          />
          <div className="container row">
            {productsData?.result?.products?.length > 0 &&
              productsData?.result?.products?.map(
                (product: any, index: number) => (
                  <ProductCard product={product} key={index} />
                )
              )}
          </div>
          <PageSelector
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageSelect={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default CategoryPage;

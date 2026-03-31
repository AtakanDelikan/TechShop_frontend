import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MainLoader, PageSelector } from "../../Components/Page/Common";
import { useGetCategoryAttributesByIdQuery } from "../../Apis/categoryAttributeApi";
import NotFound from "../NotFound";
import { SideBarFilter } from "../../Components/Page/Category";
import { useGetFilteredProductsQuery } from "../../Apis/productApi";
import { ProductCard } from "../../Components/Page/Product";
import ProductSortDropdown from "../../Components/Page/Common/ProductSortDropdown";

function CategoryPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentId, setCurrentId] = useState(id);

  if (id !== currentId) {
    setCurrentId(id);
    setSearchParams({}, { replace: true });
  }

  const pageNumber = parseInt(searchParams.get("page") || "1", 10);
  const sortString = searchParams.get("sort") || "newest";
  const attributeString = searchParams.get("attributes") || "";

  const apiQuery = `category=${id}&attributes=${attributeString}&pageSize=9&pageNumber=${pageNumber}&sort=${sortString}`;

  const { data, isLoading } = useGetCategoryAttributesByIdQuery(id);
  const { data: productsData, isLoading: isProductsLoading } =
    useGetFilteredProductsQuery(apiQuery);

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

  const handleSortChange = (newSort: string) => {
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      updatedParams.set("sort", newSort); // Update or add sort param
      updatedParams.set("page", "1"); // Reset to first page on sort change
      return updatedParams;
    });
  };

  const handleAttributeChange = (newAttributes: string) => {
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      updatedParams.set("attributes", newAttributes); // Update or add attributes param
      updatedParams.set("page", "1"); // Reset to first page on filter change
      return updatedParams;
    });
  };

  return (
    <>
      <div className="d-flex">
        {/* Sidebar */}
        <SideBarFilter
          key={id} // Whenever ID changes, sidebar resets completely
          data={data?.result}
          setAttributeQueryString={handleAttributeChange}
          attributeQueryString={attributeString}
        />

        {/* Main Content */}
        <div className="p-4 flex-grow-1">
          <h1 className="m-0">
            {productsData?.result?.availableCategories[0]?.categoryName ||
              "Products"}
          </h1>
          <div className="d-flex align-items-baseline gap-5 mb-4">
            <ProductSortDropdown
              currentSort={sortString}
              onSortChange={handleSortChange}
            />
            <h4 className="m-0 text-muted">{totalItems} items</h4>
          </div>
          <PageSelector
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageSelect={handlePageChange}
          />
          <div className="row w-100">
            {productsData?.result?.products?.length > 0 &&
              productsData?.result?.products?.map(
                (product: any, index: number) => (
                  <ProductCard product={product} key={index} />
                ),
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

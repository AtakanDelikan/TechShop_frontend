import React from "react";
import { useSearchParams } from "react-router-dom";
import { MainLoader, PageSelector } from "../../Components/Page/Common";
import NotFound from "../NotFound";
import { useGetSearchedProductsQuery } from "../../Apis/productApi";
import { ProductCard } from "../../Components/Page/Product";

function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const pageNumber = (() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  })();

  const searchQuery =
    "searchTerm=" + searchTerm + "&pageSize=9&pageNumber=" + pageNumber;
  const { data, isLoading } = useGetSearchedProductsQuery(searchQuery);

  if (isLoading) {
    return <MainLoader />;
  }

  if (!data || data?.result?.products?.length === 0) {
    return <NotFound />;
  }

  const totalPages = data.result.totalPages;
  const totalItems = data.result.totalItems;

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
      <div className="d-flex justify-content-center">
        <div className="container row p-4">
          <div>
            <h4>
              Search result for "{searchTerm}". Found {totalItems} products
            </h4>
            <PageSelector
              totalPages={totalPages}
              currentPage={pageNumber}
              onPageSelect={handlePageChange}
            />
          </div>
          {data?.result?.products.map((product: any, index: number) => (
            <ProductCard product={product} key={index} />
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

export default ProductSearch;

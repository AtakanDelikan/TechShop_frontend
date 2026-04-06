import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MainLoader,
  MiniLoader,
  PageSelector,
  StringSelector,
} from "../../Components/Page/Common";
import NotFound from "../NotFound";
import { useGetFilteredProductsQuery } from "../../Apis/productApi";
import { ProductCard } from "../../Components/Page/Product";
import ProductSortDropdown from "../../Components/Page/Common/ProductSortDropdown";

function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const pageNumber = (() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  })();

  const sortString = searchParams.get("sort") || "newest";
  const navigate = useNavigate();

  const searchQuery =
    "search=" +
    searchTerm +
    "&pageSize=9&pageNumber=" +
    pageNumber +
    "&sort=" +
    sortString;
  const { data, isLoading, isFetching } =
    useGetFilteredProductsQuery(searchQuery);

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

  const categoryAttribute = {
    uniqueValues: data.result.availableCategories.map(
      (cat: any) => cat.categoryName + " (" + cat.count + ")",
    ),
    attributeName: "Available Categories",
  };

  const handleCategorySelection = (categories: string[]) => {
    const selectedCategory =
      categories.length > 0 ? categories[0].split(" (")[0] : "";
    const categoryId = data.result.availableCategories.find(
      (cat: any) => cat.categoryName === selectedCategory,
    )?.categoryId;
    if (categoryId) {
      navigate(`/category/${categoryId}?attributes=%26search=${searchTerm}`);
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

  return (
    <div className="d-flex">
      <div
        className="bg-light p-3 overflow-auto flex-shrink-0"
        style={{
          width: "350px",
          position: "sticky",
          top: 0,
          bottom: 0,
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
          paddingBottom: "60px",
        }}
      >
        <div className="mt-5">
          <StringSelector
            attribute={categoryAttribute}
            onSelectionChange={(values: string[]) =>
              handleCategorySelection(values)
            }
          />
        </div>
      </div>

      <div className="p-4 flex-grow-1">
        <h2>
          Search result for "{searchTerm}". Found {totalItems} products
        </h2>
        <ProductSortDropdown
          currentSort={sortString}
          onSortChange={handleSortChange}
        />
        <div className="d-flex justify-content-center">
          <div className="row">
            <div>
              <PageSelector
                totalPages={totalPages}
                currentPage={pageNumber}
                onPageSelect={handlePageChange}
              />
            </div>
            <div className="row">
            {isFetching ? (
              <div className="d-flex justify-content-center mt-3">
                <MiniLoader />
              </div>
            ) : (
              data?.result?.products.map((product: any, index: number) => (
                <ProductCard product={product} key={index} />
              ))
            )}
            </div>
          </div>
        </div>
        <PageSelector
          totalPages={totalPages}
          currentPage={pageNumber}
          onPageSelect={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ProductSearch;

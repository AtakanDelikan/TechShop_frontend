import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { useGetCategoryAttributesByIdQuery } from "../../Apis/categoryAttributeApi";
import NotFound from "../NotFound";
import { SideBarFilter } from "../../Components/Page/Category";
import { useGetFilteredProductsQuery } from "../../Apis/productApi";
import { ProductCard } from "../../Components/Page/Product";

function CategoryPage() {
  const { id } = useParams();
  const [attributeQueryString, setAttributeQueryString] = useState("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    const categoryId = id ? id.toString() : "";
    setQueryParams(
      "category=" + categoryId + "&attributes=" + attributeQueryString
    );
  }, [attributeQueryString, id]);

  const { data, isLoading } = useGetCategoryAttributesByIdQuery(id);
  const { data: products, isLoading: isProductsLoading } =
    useGetFilteredProductsQuery(queryParams);

  if (isLoading || isProductsLoading) {
    return <MainLoader />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <>
      <div className="d-flex">
        {/* Sidebar */}
        <SideBarFilter
          attributes={data?.result}
          setAttributeQueryString={setAttributeQueryString}
        />

        {/* Main Content */}
        <div className="p-4 flex-grow-1">
          <h1>Producs</h1>
          <div className="container row">
            {products.length > 0 &&
              products.map((product: any, index: number) => (
                <ProductCard product={product} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
